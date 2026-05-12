-- ============================================================================
-- ZAVO — SCHEMA DO BANCO DE DADOS (DATABASE SCHEMA)
-- ============================================================================
-- Versão: 1.0 — MVP
-- Banco: PostgreSQL via Supabase
-- Última atualização: Maio 2026
--
-- ESTRUTURA DAS TABELAS:
--   1. profiles          → Perfil do admin (vinculado ao auth.users do Supabase)
--   2. clients           → Clientes da Zavo Tech
--   3. contracts         → Contratos vinculados a clientes
--   4. leads             → Leads no pipeline de vendas
--   5. interactions      → Histórico de interações (com leads e clientes)
--   6. apify_searches    → Histórico de buscas de prospecção via Apify
--   7. payments          → Pagamentos (Stripe e manuais)
--
-- SEGURANÇA:
--   - RLS (Row Level Security) habilitado em todas as tabelas
--   - Apenas o admin autenticado tem acesso aos seus próprios dados
--   - Soft delete via campo deleted_at (exclusão lógica)
-- ============================================================================


-- ============================================================================
-- EXTENSÕES NECESSÁRIAS
-- ============================================================================

-- Extensão para gerar UUIDs (Universally Unique Identifiers)
create extension if not exists "uuid-ossp";


-- ============================================================================
-- 1. TABELA: profiles
-- Descrição: Perfil estendido do admin, vinculado ao auth.users do Supabase Auth
-- ============================================================================

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text not null unique,
  avatar_url text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

comment on table public.profiles is 'Perfil do administrador único do sistema Zavo';


-- ============================================================================
-- 2. TABELA: clients
-- Descrição: Clientes da Zavo Tech (PMEs e autônomos que contratam serviços)
-- ============================================================================

create table public.clients (
  id uuid primary key default uuid_generate_v4(),
  owner_id uuid references public.profiles(id) on delete cascade not null,

  -- Dados da empresa
  company_name text not null,
  contact_name text not null,
  email text not null,
  phone text,
  website text,
  niche text,                      -- Nicho/segmento (ex: restaurante, advocacia)
  address text,

  -- Status
  status text not null default 'prospect'
    check (status in ('prospect', 'active', 'inactive')),

  -- Observações livres
  notes text,

  -- Vinculação com lead de origem (se foi convertido de um lead)
  converted_from_lead_id uuid,

  -- Auditoria e soft delete
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  deleted_at timestamptz                 -- Soft delete (exclusão lógica)
);

comment on table public.clients is 'Clientes da Zavo Tech';
comment on column public.clients.status is 'prospect = potencial; active = cliente ativo; inactive = cliente inativo';
comment on column public.clients.deleted_at is 'Soft delete: registros com deleted_at não nulo são considerados excluídos';

-- Índices para performance de busca
create index idx_clients_owner on public.clients(owner_id);
create index idx_clients_status on public.clients(status);
create index idx_clients_email on public.clients(email);
create index idx_clients_company_name on public.clients using gin (to_tsvector('portuguese', company_name));


-- ============================================================================
-- 3. TABELA: contracts
-- Descrição: Contratos de serviços vinculados a clientes
-- ============================================================================

create table public.contracts (
  id uuid primary key default uuid_generate_v4(),
  owner_id uuid references public.profiles(id) on delete cascade not null,
  client_id uuid references public.clients(id) on delete cascade not null,

  -- Dados do contrato
  service_type text not null
    check (service_type in ('website', 'app', 'ai_automation', 'maintenance', 'other')),
  description text,
  total_value_usd numeric(10, 2) not null check (total_value_usd >= 0),

  -- Datas
  start_date date not null,
  expected_delivery_date date,

  -- Status
  status text not null default 'draft'
    check (status in ('draft', 'active', 'completed', 'cancelled')),

  -- Auditoria
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  deleted_at timestamptz
);

comment on table public.contracts is 'Contratos de serviços fechados com clientes';
comment on column public.contracts.service_type is 'website = site; app = aplicativo; ai_automation = automação com IA; maintenance = manutenção; other = outro';

create index idx_contracts_owner on public.contracts(owner_id);
create index idx_contracts_client on public.contracts(client_id);
create index idx_contracts_status on public.contracts(status);


-- ============================================================================
-- 4. TABELA: leads
-- Descrição: Leads no pipeline de vendas (Kanban)
-- ============================================================================

create table public.leads (
  id uuid primary key default uuid_generate_v4(),
  owner_id uuid references public.profiles(id) on delete cascade not null,

  -- Dados do lead
  name text not null,                              -- Nome da empresa ou pessoa
  email text,
  phone text,
  website text,
  niche text,
  location text,

  -- Origem
  source text not null default 'manual'
    check (source in ('manual', 'apify', 'referral', 'other')),

  -- Pipeline (Kanban)
  stage text not null default 'new'
    check (stage in ('new', 'contacted', 'proposal_sent', 'won', 'lost')),

  -- Qualificação por IA
  qualification_score integer check (qualification_score between 0 and 100),
  ai_summary text,                                 -- Resumo gerado pela IA
  ai_approach_suggestion text,                     -- Sugestão de abordagem

  -- Conversão
  converted_to_client_id uuid references public.clients(id) on delete set null,
  converted_at timestamptz,

  -- Vinculação com busca Apify (se origem = apify)
  apify_search_id uuid,

  -- Observações
  notes text,

  -- Auditoria
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  deleted_at timestamptz
);

comment on table public.leads is 'Leads no funil de vendas (pipeline Kanban)';
comment on column public.leads.stage is 'new = novo; contacted = em contato; proposal_sent = proposta enviada; won = fechado/ganho; lost = perdido';
comment on column public.leads.qualification_score is 'Score 0-100 gerado pela IA com base nos dados do lead';

create index idx_leads_owner on public.leads(owner_id);
create index idx_leads_stage on public.leads(stage);
create index idx_leads_source on public.leads(source);
create index idx_leads_score on public.leads(qualification_score desc nulls last);


-- ============================================================================
-- 5. TABELA: interactions
-- Descrição: Histórico de interações com leads e clientes
-- ============================================================================

create table public.interactions (
  id uuid primary key default uuid_generate_v4(),
  owner_id uuid references public.profiles(id) on delete cascade not null,

  -- Vinculação polimórfica: pode ser com lead OU cliente (nunca ambos)
  client_id uuid references public.clients(id) on delete cascade,
  lead_id uuid references public.leads(id) on delete cascade,

  -- Dados da interação
  type text not null
    check (type in ('email', 'call', 'meeting', 'message', 'other')),
  summary text not null,
  occurred_at timestamptz not null default now(),

  -- Auditoria
  created_at timestamptz default now() not null,

  -- Garante que interação está vinculada a lead OU cliente (XOR)
  constraint chk_interaction_target check (
    (client_id is not null and lead_id is null) or
    (client_id is null and lead_id is not null)
  )
);

comment on table public.interactions is 'Histórico de interações com leads e clientes';
comment on constraint chk_interaction_target on public.interactions is 'Interação deve estar vinculada a um lead OU a um cliente, nunca ambos';

create index idx_interactions_owner on public.interactions(owner_id);
create index idx_interactions_client on public.interactions(client_id) where client_id is not null;
create index idx_interactions_lead on public.interactions(lead_id) where lead_id is not null;
create index idx_interactions_occurred on public.interactions(occurred_at desc);


-- ============================================================================
-- 6. TABELA: apify_searches
-- Descrição: Histórico de buscas de prospecção via Apify
-- ============================================================================

create table public.apify_searches (
  id uuid primary key default uuid_generate_v4(),
  owner_id uuid references public.profiles(id) on delete cascade not null,

  -- Configuração da busca
  actor_id text not null,                          -- ID do ator Apify (ex: 'apify/google-maps-scraper')
  actor_name text not null,                        -- Nome amigável (ex: 'Google Maps Scraper')
  parameters jsonb not null,                       -- Parâmetros enviados ao ator (nicho, localização, etc.)

  -- Execução no Apify
  apify_run_id text,                               -- ID da execução no Apify
  status text not null default 'running'
    check (status in ('running', 'succeeded', 'failed', 'aborted')),

  -- Resultados
  total_results integer default 0,                 -- Quantidade de leads retornados
  imported_leads_count integer default 0,          -- Quantidade efetivamente importada (sem duplicatas)

  -- Erro (se houver)
  error_message text,

  -- Auditoria
  started_at timestamptz default now() not null,
  finished_at timestamptz,
  created_at timestamptz default now() not null
);

comment on table public.apify_searches is 'Histórico de buscas de prospecção executadas via Apify';
comment on column public.apify_searches.parameters is 'JSON com parâmetros enviados ao ator (varia por tipo de busca)';

create index idx_apify_searches_owner on public.apify_searches(owner_id);
create index idx_apify_searches_status on public.apify_searches(status);
create index idx_apify_searches_started on public.apify_searches(started_at desc);

-- Adicionar foreign key na tabela leads agora que apify_searches existe
alter table public.leads
  add constraint fk_leads_apify_search
  foreign key (apify_search_id) references public.apify_searches(id) on delete set null;


-- ============================================================================
-- 7. TABELA: payments
-- Descrição: Pagamentos (Stripe e manuais)
-- ============================================================================

create table public.payments (
  id uuid primary key default uuid_generate_v4(),
  owner_id uuid references public.profiles(id) on delete cascade not null,
  contract_id uuid references public.contracts(id) on delete cascade not null,

  -- Valor e moeda
  amount_usd numeric(10, 2) not null check (amount_usd >= 0),

  -- Método de pagamento
  payment_method text not null
    check (payment_method in ('stripe', 'pix', 'bank_transfer', 'cash', 'other')),

  -- Status
  status text not null default 'pending'
    check (status in ('pending', 'succeeded', 'failed', 'refunded')),

  -- Stripe (preenchido se payment_method = 'stripe')
  stripe_payment_link text,
  stripe_payment_intent_id text,
  stripe_checkout_session_id text,

  -- Pagamento manual
  manual_receipt_url text,                         -- URL do comprovante (Supabase Storage)
  manual_notes text,

  -- Datas
  paid_at timestamptz,                             -- Preenchido quando status = 'succeeded'

  -- Auditoria
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

comment on table public.payments is 'Pagamentos vinculados a contratos (Stripe ou manual)';
comment on column public.payments.payment_method is 'stripe = via Stripe; pix = Pix; bank_transfer = transferência; cash = dinheiro; other = outro';

create index idx_payments_owner on public.payments(owner_id);
create index idx_payments_contract on public.payments(contract_id);
create index idx_payments_status on public.payments(status);
create index idx_payments_stripe_intent on public.payments(stripe_payment_intent_id) where stripe_payment_intent_id is not null;


-- ============================================================================
-- TRIGGERS — Atualização automática de updated_at
-- ============================================================================

create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Aplicar trigger em todas as tabelas com updated_at
create trigger set_updated_at before update on public.profiles
  for each row execute function public.handle_updated_at();

create trigger set_updated_at before update on public.clients
  for each row execute function public.handle_updated_at();

create trigger set_updated_at before update on public.contracts
  for each row execute function public.handle_updated_at();

create trigger set_updated_at before update on public.leads
  for each row execute function public.handle_updated_at();

create trigger set_updated_at before update on public.payments
  for each row execute function public.handle_updated_at();


-- ============================================================================
-- TRIGGER — Criar profile automaticamente ao criar usuário
-- ============================================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.email)
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();


-- ============================================================================
-- ROW LEVEL SECURITY (RLS) — SEGURANÇA EM NÍVEL DE LINHA
-- ============================================================================
-- Habilita RLS em todas as tabelas e cria políticas que garantem que apenas
-- o owner (admin autenticado) acesse seus próprios registros.
-- ============================================================================

-- Habilitar RLS
alter table public.profiles enable row level security;
alter table public.clients enable row level security;
alter table public.contracts enable row level security;
alter table public.leads enable row level security;
alter table public.interactions enable row level security;
alter table public.apify_searches enable row level security;
alter table public.payments enable row level security;


-- ----------------------------------------------------------------------------
-- POLÍTICAS — profiles
-- ----------------------------------------------------------------------------

create policy "Usuário pode ver seu próprio perfil"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Usuário pode atualizar seu próprio perfil"
  on public.profiles for update
  using (auth.uid() = id);


-- ----------------------------------------------------------------------------
-- POLÍTICAS — clients
-- ----------------------------------------------------------------------------

create policy "Owner pode ver seus clientes"
  on public.clients for select
  using (auth.uid() = owner_id and deleted_at is null);

create policy "Owner pode inserir clientes"
  on public.clients for insert
  with check (auth.uid() = owner_id);

create policy "Owner pode atualizar seus clientes"
  on public.clients for update
  using (auth.uid() = owner_id);

create policy "Owner pode deletar seus clientes"
  on public.clients for delete
  using (auth.uid() = owner_id);


-- ----------------------------------------------------------------------------
-- POLÍTICAS — contracts
-- ----------------------------------------------------------------------------

create policy "Owner pode ver seus contratos"
  on public.contracts for select
  using (auth.uid() = owner_id and deleted_at is null);

create policy "Owner pode inserir contratos"
  on public.contracts for insert
  with check (auth.uid() = owner_id);

create policy "Owner pode atualizar seus contratos"
  on public.contracts for update
  using (auth.uid() = owner_id);

create policy "Owner pode deletar seus contratos"
  on public.contracts for delete
  using (auth.uid() = owner_id);


-- ----------------------------------------------------------------------------
-- POLÍTICAS — leads
-- ----------------------------------------------------------------------------

create policy "Owner pode ver seus leads"
  on public.leads for select
  using (auth.uid() = owner_id and deleted_at is null);

create policy "Owner pode inserir leads"
  on public.leads for insert
  with check (auth.uid() = owner_id);

create policy "Owner pode atualizar seus leads"
  on public.leads for update
  using (auth.uid() = owner_id);

create policy "Owner pode deletar seus leads"
  on public.leads for delete
  using (auth.uid() = owner_id);


-- ----------------------------------------------------------------------------
-- POLÍTICAS — interactions
-- ----------------------------------------------------------------------------

create policy "Owner pode ver suas interações"
  on public.interactions for select
  using (auth.uid() = owner_id);

create policy "Owner pode inserir interações"
  on public.interactions for insert
  with check (auth.uid() = owner_id);

create policy "Owner pode atualizar suas interações"
  on public.interactions for update
  using (auth.uid() = owner_id);

create policy "Owner pode deletar suas interações"
  on public.interactions for delete
  using (auth.uid() = owner_id);


-- ----------------------------------------------------------------------------
-- POLÍTICAS — apify_searches
-- ----------------------------------------------------------------------------

create policy "Owner pode ver suas buscas Apify"
  on public.apify_searches for select
  using (auth.uid() = owner_id);

create policy "Owner pode inserir buscas Apify"
  on public.apify_searches for insert
  with check (auth.uid() = owner_id);

create policy "Owner pode atualizar suas buscas Apify"
  on public.apify_searches for update
  using (auth.uid() = owner_id);


-- ----------------------------------------------------------------------------
-- POLÍTICAS — payments
-- ----------------------------------------------------------------------------

create policy "Owner pode ver seus pagamentos"
  on public.payments for select
  using (auth.uid() = owner_id);

create policy "Owner pode inserir pagamentos"
  on public.payments for insert
  with check (auth.uid() = owner_id);

create policy "Owner pode atualizar seus pagamentos"
  on public.payments for update
  using (auth.uid() = owner_id);


-- ============================================================================
-- VIEWS AUXILIARES — Métricas para Dashboard
-- ============================================================================

-- View: total de leads, contratos ativos e receita do mês corrente
create or replace view public.dashboard_summary as
select
  p.id as owner_id,
  (select count(*) from public.leads l
    where l.owner_id = p.id
      and l.deleted_at is null
      and date_trunc('month', l.created_at) = date_trunc('month', now())
  ) as leads_this_month,

  (select count(*) from public.contracts c
    where c.owner_id = p.id
      and c.status = 'active'
      and c.deleted_at is null
  ) as active_contracts,

  (select coalesce(sum(amount_usd), 0) from public.payments pay
    where pay.owner_id = p.id
      and pay.status = 'succeeded'
      and date_trunc('month', pay.paid_at) = date_trunc('month', now())
  ) as revenue_this_month_usd

from public.profiles p;

comment on view public.dashboard_summary is 'Resumo de métricas para o dashboard principal';


-- ============================================================================
-- FIM DO SCHEMA
-- ============================================================================
