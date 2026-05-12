-- ============================================================
-- ZAVO — Schema Supabase (Postgres 15)
-- Pronto pra colar no SQL Editor do Supabase
-- Inclui: tabelas, RLS, índices, triggers, pgvector, audit log
-- ============================================================

-- ----------------------------------------------------------------
-- 1. EXTENSÕES
-- ----------------------------------------------------------------
create extension if not exists "uuid-ossp";
create extension if not exists "vector";       -- pgvector pra busca semântica
create extension if not exists "pg_trgm";      -- busca fuzzy (similaridade textual)
create extension if not exists "pgcrypto";

-- ----------------------------------------------------------------
-- 2. ENUMS (tipos enumerados)
-- ----------------------------------------------------------------
create type prospect_status as enum (
  'new',
  'enriching',
  'qualified',
  'disqualified',
  'awaiting_approval',
  'approved',
  'contacting',
  'engaged',
  'meeting_scheduled',
  'won',
  'lost',
  'unsubscribed'
);

create type contact_channel as enum ('email', 'whatsapp', 'linkedin', 'sms', 'phone');

create type message_status as enum (
  'queued',
  'awaiting_approval',
  'approved',
  'sent',
  'delivered',
  'opened',
  'clicked',
  'replied',
  'bounced',
  'failed'
);

create type contract_status as enum ('draft', 'sent', 'signed', 'active', 'completed', 'cancelled');

create type meeting_status as enum ('scheduled', 'confirmed', 'completed', 'no_show', 'cancelled');

create type lawful_basis as enum (
  'consent',
  'legitimate_interest_b2b',
  'contract',
  'legal_obligation'
);

create type consent_status as enum ('pending', 'granted', 'revoked');

-- ----------------------------------------------------------------
-- 3. CLIENTES (clientes ativos da Zavo)
-- ----------------------------------------------------------------
create table public.clientes (
  id uuid primary key default uuid_generate_v4(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  -- dados cadastrais
  nome text not null,
  empresa text,
  email text,
  telefone text,
  whatsapp text,
  linkedin_url text,
  cnpj text,
  endereco jsonb,
  -- relacionamento
  origem text,                       -- como veio (ex: 'prospeccao', 'indicacao', 'site')
  prospect_id uuid,                  -- FK pra prospect que virou cliente
  -- comercial
  ticket_medio numeric(10,2),
  ltv numeric(10,2),                 -- Lifetime Value (valor no tempo de vida)
  status text default 'active',
  tags text[],
  -- metadados
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index idx_clientes_owner on public.clientes(owner_id);
create index idx_clientes_email on public.clientes(email);
create index idx_clientes_nome_trgm on public.clientes using gin (nome gin_trgm_ops);

alter table public.clientes enable row level security;

create policy "owner_full_access_clientes" on public.clientes
  for all using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);

-- ----------------------------------------------------------------
-- 4. PROSPECTS (leads em prospecção, ainda não clientes)
-- ----------------------------------------------------------------
create table public.prospects (
  id uuid primary key default uuid_generate_v4(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  -- identificação
  nome text,
  empresa text,
  cargo text,
  email text,
  telefone text,
  whatsapp text,
  linkedin_url text,
  website text,
  -- segmentação / qualificação
  segmento text,
  porte_empresa text,                -- 'micro', 'pequena', 'media', 'grande'
  pais text default 'BR',
  cidade text,
  -- IA / score
  qualification_score smallint,      -- 0-100 (gerado pela IA)
  qualification_reason text,         -- justificativa em texto
  enrichment_data jsonb,             -- dump bruto do Apify/Apollo
  embedding vector(1024),            -- voyage-3-lite produz 1024 dims
  -- pipeline
  status prospect_status default 'new',
  -- LGPD
  source text not null,              -- ex: 'apify_linkedin_actor_xyz'
  source_url text,                   -- URL onde foi coletado
  lawful_basis lawful_basis default 'legitimate_interest_b2b',
  consent_status consent_status default 'pending',
  collected_at timestamptz default now(),
  data_retention_until timestamptz default (now() + interval '18 months'),
  -- timeline
  last_contact_at timestamptz,
  next_action_at timestamptz,
  -- metadados
  tags text[],
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index idx_prospects_owner on public.prospects(owner_id);
create index idx_prospects_status on public.prospects(status);
create index idx_prospects_email on public.prospects(email);
create index idx_prospects_next_action on public.prospects(next_action_at) where next_action_at is not null;
create index idx_prospects_embedding on public.prospects using ivfflat (embedding vector_cosine_ops) with (lists = 100);
create index idx_prospects_retention on public.prospects(data_retention_until);

alter table public.prospects enable row level security;

create policy "owner_full_access_prospects" on public.prospects
  for all using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);

-- evita duplicatas de e-mail por owner
create unique index uniq_prospects_email_owner on public.prospects(owner_id, lower(email))
  where email is not null;

-- FK reversa de clientes → prospects
alter table public.clientes
  add constraint fk_clientes_prospect
  foreign key (prospect_id) references public.prospects(id) on delete set null;

-- ----------------------------------------------------------------
-- 5. CAMPAIGNS (campanhas de prospecção)
-- ----------------------------------------------------------------
create table public.campaigns (
  id uuid primary key default uuid_generate_v4(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  nome text not null,
  descricao text,
  -- targeting
  icp jsonb,                         -- Ideal Customer Profile (perfil de cliente ideal)
  filtros jsonb,                     -- critérios de qualificação
  -- canais e cadência
  canais contact_channel[] default array['email']::contact_channel[],
  cadencia jsonb,                    -- ex: {dia0: email, dia3: whatsapp, dia7: linkedin}
  -- IA / prompts
  prompt_qualificacao text,
  prompt_abordagem_email text,
  prompt_abordagem_whatsapp text,
  prompt_followup text,
  -- modo
  autonomous_mode boolean default false,  -- false = gera e espera aprovação
  -- métricas
  total_prospects int default 0,
  total_sent int default 0,
  total_replied int default 0,
  total_meetings int default 0,
  -- status
  active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index idx_campaigns_owner on public.campaigns(owner_id);
alter table public.campaigns enable row level security;
create policy "owner_full_access_campaigns" on public.campaigns
  for all using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);

-- ----------------------------------------------------------------
-- 6. MESSAGES (todas as comunicações enviadas/recebidas)
-- ----------------------------------------------------------------
create table public.messages (
  id uuid primary key default uuid_generate_v4(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  -- relacionamentos
  prospect_id uuid references public.prospects(id) on delete cascade,
  cliente_id uuid references public.clientes(id) on delete cascade,
  campaign_id uuid references public.campaigns(id) on delete set null,
  -- conteúdo
  channel contact_channel not null,
  direction text check (direction in ('outbound', 'inbound')),
  subject text,
  body text not null,
  -- IA
  generated_by_ai boolean default false,
  ai_model text,                     -- ex: 'claude-sonnet-4-5'
  ai_prompt_id uuid,                 -- FK pra prompt usado (auditoria)
  ai_tokens_used int,
  -- status
  status message_status default 'queued',
  -- aprovação
  approved_by uuid references auth.users(id),
  approved_at timestamptz,
  -- envio
  scheduled_for timestamptz,
  sent_at timestamptz,
  delivered_at timestamptz,
  opened_at timestamptz,
  clicked_at timestamptz,
  replied_at timestamptz,
  -- metadados externos
  external_id text,                  -- id do Resend, Z-API, etc
  error_message text,
  metadata jsonb,
  created_at timestamptz default now()
);

create index idx_messages_owner on public.messages(owner_id);
create index idx_messages_prospect on public.messages(prospect_id);
create index idx_messages_campaign on public.messages(campaign_id);
create index idx_messages_status on public.messages(status);
create index idx_messages_scheduled on public.messages(scheduled_for) where status = 'queued';

alter table public.messages enable row level security;
create policy "owner_full_access_messages" on public.messages
  for all using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);

-- ----------------------------------------------------------------
-- 7. CONTRACTS (contratos)
-- ----------------------------------------------------------------
create table public.contracts (
  id uuid primary key default uuid_generate_v4(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  cliente_id uuid not null references public.clientes(id) on delete cascade,
  -- identificação
  numero text,                       -- ex: 'CT-2026-001'
  titulo text not null,
  descricao text,
  -- valores
  valor_total numeric(12,2) not null,
  moeda text default 'BRL',
  forma_pagamento text,
  parcelas int default 1,
  -- vigência
  data_inicio date,
  data_fim date,
  -- arquivos
  file_path text,                    -- path no Supabase Storage
  file_url text,                     -- URL assinada (gerada on-demand)
  -- status
  status contract_status default 'draft',
  signed_at timestamptz,
  -- metadados
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index idx_contracts_owner on public.contracts(owner_id);
create index idx_contracts_cliente on public.contracts(cliente_id);
create index idx_contracts_status on public.contracts(status);

alter table public.contracts enable row level security;
create policy "owner_full_access_contracts" on public.contracts
  for all using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);

-- ----------------------------------------------------------------
-- 8. MEETINGS (reuniões)
-- ----------------------------------------------------------------
create table public.meetings (
  id uuid primary key default uuid_generate_v4(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  -- relacionamentos
  prospect_id uuid references public.prospects(id) on delete set null,
  cliente_id uuid references public.clientes(id) on delete set null,
  -- detalhes
  titulo text not null,
  descricao text,
  link_video text,                   -- Google Meet / Zoom
  local text,                        -- presencial
  -- agenda
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  timezone text default 'America/New_York',
  -- status
  status meeting_status default 'scheduled',
  -- pós-reunião
  transcricao text,
  resumo_ia text,                    -- resumo gerado por IA
  acoes_pos_reuniao jsonb,           -- action items
  -- integração externa
  google_calendar_event_id text,
  -- metadados
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index idx_meetings_owner on public.meetings(owner_id);
create index idx_meetings_starts on public.meetings(starts_at);
create index idx_meetings_status on public.meetings(status);

alter table public.meetings enable row level security;
create policy "owner_full_access_meetings" on public.meetings
  for all using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);

-- ----------------------------------------------------------------
-- 9. AI_PROMPTS (versionamento de prompts da IA — auditoria)
-- ----------------------------------------------------------------
create table public.ai_prompts (
  id uuid primary key default uuid_generate_v4(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  nome text not null,                -- ex: 'qualificacao_b2b_v3'
  versao int default 1,
  prompt_system text not null,
  prompt_user_template text,
  modelo text default 'claude-sonnet-4-5',
  temperature numeric(3,2) default 0.7,
  active boolean default true,
  created_at timestamptz default now()
);

create index idx_prompts_owner on public.ai_prompts(owner_id);
create index idx_prompts_nome on public.ai_prompts(owner_id, nome, versao);
alter table public.ai_prompts enable row level security;
create policy "owner_full_access_prompts" on public.ai_prompts
  for all using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);

-- ----------------------------------------------------------------
-- 10. AI_USAGE_LOG (controle de custo de IA)
-- ----------------------------------------------------------------
create table public.ai_usage_log (
  id uuid primary key default uuid_generate_v4(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  modelo text not null,
  operacao text,                     -- ex: 'qualify_prospect', 'generate_email'
  input_tokens int,
  output_tokens int,
  cached_tokens int default 0,
  cost_usd numeric(10,6),
  duration_ms int,
  related_entity text,               -- ex: 'prospect:abc-123'
  created_at timestamptz default now()
);

create index idx_ai_log_owner_date on public.ai_usage_log(owner_id, created_at desc);
alter table public.ai_usage_log enable row level security;
create policy "owner_read_ai_log" on public.ai_usage_log
  for select using (auth.uid() = owner_id);
create policy "service_insert_ai_log" on public.ai_usage_log
  for insert with check (auth.uid() = owner_id);

-- ----------------------------------------------------------------
-- 11. AUDIT_LOG (auditoria geral — LGPD)
-- ----------------------------------------------------------------
create table public.audit_log (
  id uuid primary key default uuid_generate_v4(),
  owner_id uuid references auth.users(id),
  acao text not null,                -- 'created', 'updated', 'deleted', 'accessed', 'exported'
  entidade text not null,            -- 'prospect', 'cliente', etc
  entidade_id uuid,
  diff jsonb,                        -- campos alterados
  ip_address inet,
  user_agent text,
  created_at timestamptz default now()
);

create index idx_audit_owner_date on public.audit_log(owner_id, created_at desc);
create index idx_audit_entidade on public.audit_log(entidade, entidade_id);
alter table public.audit_log enable row level security;
create policy "owner_read_audit" on public.audit_log
  for select using (auth.uid() = owner_id);

-- ----------------------------------------------------------------
-- 12. UNSUBSCRIBE_TOKENS (tokens públicos de descadastro - LGPD)
-- ----------------------------------------------------------------
create table public.unsubscribe_tokens (
  token text primary key default encode(gen_random_bytes(32), 'hex'),
  prospect_id uuid not null references public.prospects(id) on delete cascade,
  owner_id uuid not null references auth.users(id) on delete cascade,
  used_at timestamptz,
  expires_at timestamptz default (now() + interval '5 years'),
  created_at timestamptz default now()
);

create index idx_unsub_prospect on public.unsubscribe_tokens(prospect_id);
-- Esta tabela NÃO tem RLS habilitada porque o endpoint público precisa ler sem auth.
-- A segurança vem do token aleatório de 64 chars (256 bits de entropia).

-- ----------------------------------------------------------------
-- 13. TRIGGERS — updated_at automático
-- ----------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_clientes_updated before update on public.clientes
  for each row execute function public.set_updated_at();
create trigger trg_prospects_updated before update on public.prospects
  for each row execute function public.set_updated_at();
create trigger trg_campaigns_updated before update on public.campaigns
  for each row execute function public.set_updated_at();
create trigger trg_contracts_updated before update on public.contracts
  for each row execute function public.set_updated_at();
create trigger trg_meetings_updated before update on public.meetings
  for each row execute function public.set_updated_at();

-- ----------------------------------------------------------------
-- 14. TRIGGER — bloquear envio pra prospect com consent revogado
-- ----------------------------------------------------------------
create or replace function public.block_message_to_unsubscribed()
returns trigger as $$
declare
  consent consent_status;
begin
  if new.prospect_id is not null and new.direction = 'outbound' then
    select p.consent_status into consent
    from public.prospects p
    where p.id = new.prospect_id;

    if consent = 'revoked' then
      raise exception 'LGPD violation: prospect % has revoked consent. Outbound message blocked.', new.prospect_id;
    end if;
  end if;
  return new;
end;
$$ language plpgsql;

create trigger trg_block_unsubscribed before insert on public.messages
  for each row execute function public.block_message_to_unsubscribed();

-- ----------------------------------------------------------------
-- 15. FUNÇÃO — busca semântica de prospects similares
-- ----------------------------------------------------------------
create or replace function public.search_similar_prospects(
  query_embedding vector(1024),
  match_threshold float default 0.7,
  match_count int default 10
)
returns table (
  id uuid,
  nome text,
  empresa text,
  similarity float
)
language sql stable security definer
as $$
  select
    p.id,
    p.nome,
    p.empresa,
    1 - (p.embedding <=> query_embedding) as similarity
  from public.prospects p
  where p.owner_id = auth.uid()
    and p.embedding is not null
    and 1 - (p.embedding <=> query_embedding) > match_threshold
  order by p.embedding <=> query_embedding
  limit match_count;
$$;

-- ----------------------------------------------------------------
-- 16. JOB DE EXPURGO (LGPD — retenção de dados)
-- Roda via pg_cron ou n8n diariamente
-- ----------------------------------------------------------------
create or replace function public.purge_expired_prospects()
returns void
language plpgsql security definer
as $$
begin
  delete from public.prospects
  where data_retention_until < now()
    and status not in ('won', 'engaged', 'meeting_scheduled');

  insert into public.audit_log (acao, entidade, diff)
  values ('purged_expired', 'prospects', jsonb_build_object('purged_at', now()));
end;
$$;

-- ----------------------------------------------------------------
-- FIM DO SCHEMA
-- ----------------------------------------------------------------
-- Próximos passos após rodar este SQL:
-- 1. Configurar Storage bucket 'contracts' com RLS
-- 2. Criar usuário Irineu via Supabase Auth UI
-- 3. Inserir prompts iniciais em ai_prompts
-- 4. Configurar Vault do Supabase para guardar API keys
-- ============================================================
