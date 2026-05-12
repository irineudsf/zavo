# REGRAS — Zavo

**Regras de Negócio, UI/UX e Segurança**
Versão: 1.0 — MVP
Última atualização: Maio 2026

> Este documento complementa o `CLAUDE.md` e o `REQUISITOS.md`.
> Aqui estão as regras **inegociáveis** que governam comportamento do sistema, decisões de interface e segurança.

---

## 1. Regras de Negócio (Business Rules)

### 1.1 Clientes (Clients)

#### RN01 — Status do cliente
- Todo cliente nasce com status `prospect`.
- Quando um lead é convertido (movido para "Fechado"), o cliente criado nasce diretamente como `active`.
- Apenas o admin pode mudar manualmente o status para `inactive`.

#### RN02 — Unicidade de e-mail
- Não é permitido cadastrar dois clientes ativos com o mesmo e-mail.
- Validação ocorre no frontend (Zod) e no backend (constraint do Supabase).

#### RN03 — Soft delete
- Clientes "excluídos" recebem timestamp em `deleted_at`, mas permanecem no banco.
- Listagens públicas filtram automaticamente por `deleted_at IS NULL`.
- Histórico do cliente (contratos, interações, pagamentos) é preservado mesmo após soft delete.

---

### 1.2 Contratos (Contracts)

#### RN04 — Vinculação obrigatória
- Todo contrato **deve** estar vinculado a um cliente existente (não-deletado).
- Não é possível criar contrato sem cliente.

#### RN05 — Valor positivo
- O valor do contrato deve ser maior ou igual a zero.
- Contratos com valor zero são permitidos (ex.: serviços de cortesia, demonstrações).

#### RN06 — Estados do contrato
- `draft` → `active` → `completed` (fluxo normal)
- `draft` → `cancelled` (cancelado antes de iniciar)
- `active` → `cancelled` (cancelado durante execução)
- Não é possível voltar de `completed` para `active`.

#### RN07 — Datas
- `start_date` é obrigatória.
- `expected_delivery_date`, se informada, deve ser **posterior ou igual** à `start_date`.

---

### 1.3 Leads e Pipeline (Leads & Pipeline)

#### RN08 — Estágios do pipeline
Os 5 estágios são fixos e **não podem ser alterados** sem migração de banco:
1. **Novo (`new`)** — lead recém-importado ou cadastrado, ainda não contatado
2. **Em Contato (`contacted`)** — primeira tentativa de contato realizada
3. **Proposta Enviada (`proposal_sent`)** — proposta comercial entregue
4. **Fechado / Ganho (`won`)** — virou cliente
5. **Perdido (`lost`)** — não converteu

#### RN09 — Movimentação livre
- O admin pode mover leads em qualquer direção entre estágios (avançar ou retroceder).
- Cada mudança de estágio atualiza `updated_at`.

#### RN10 — Conversão de lead em cliente
- Ao mover um lead para `won`, o sistema **deve oferecer** (modal) a conversão em cliente.
- Conversão é uma ação **explícita** do admin, não automática.
- Após convertido:
  - O lead recebe `converted_to_client_id` e `converted_at`
  - O cliente criado recebe `converted_from_lead_id`
  - O lead permanece visível na coluna "Fechado" (não é deletado)

#### RN11 — Detecção de duplicatas (Apify)
- Ao importar leads via Apify, o sistema deve detectar duplicatas comparando:
  - **E-mail** (case insensitive) — match exato
  - **Telefone** (apenas dígitos) — match exato
  - Se houver match com lead ativo, o registro é **descartado** e contado como duplicata.

#### RN12 — Score de qualificação por IA
- Score é gerado **uma vez** após importação ou cadastro manual.
- Pode ser **regerado manualmente** pelo admin, mas não automaticamente.
- Score é armazenado no banco — **não recalcula a cada visualização**.

---

### 1.4 Prospecção Apify (Apify Prospecting)

#### RN13 — Limite de leads por busca
- Cada busca Apify é limitada a **100 leads** por execução (parâmetro fixo, configurável apenas via código).
- O motivo é controle de custos do Apify e da Anthropic API.

#### RN14 — Status de busca
- Toda busca disparada nasce com status `running`.
- Ao receber webhook do Apify ou polling, status muda para `succeeded`, `failed` ou `aborted`.
- Buscas em `running` por mais de 24h são marcadas automaticamente como `failed`.

#### RN15 — Atribuição automática
- Todos os leads importados de uma busca recebem:
  - `source = 'apify'`
  - `stage = 'new'`
  - `apify_search_id` apontando para a busca de origem

---

### 1.5 Pagamentos (Payments)

#### RN16 — Vinculação obrigatória ao contrato
- Todo pagamento **deve** estar vinculado a um contrato.
- Não existe pagamento "avulso" no MVP.

#### RN17 — Total de pagamentos
- A soma dos pagamentos `succeeded` de um contrato pode ser maior, igual ou menor que o `total_value_usd` do contrato.
- O sistema **não bloqueia** pagamentos a maior (permite ajustes, taxas, juros, multas).
- O dashboard mostra `% pago` e alerta visualmente quando `% pago > 100%`.

#### RN18 — Status de pagamento Stripe
- Status só muda via webhook validado.
- Nunca atualizar status de pagamento Stripe manualmente pelo admin.

#### RN19 — Pagamentos manuais
- Pagamentos de método `pix`, `bank_transfer`, `cash`, `other` nascem com status `pending`.
- O admin **deve** marcar como `succeeded` manualmente após confirmar recebimento.
- Comprovante (upload) é **opcional** mas recomendado.

#### RN20 — Reembolso (refund)
- Pagamentos Stripe reembolsados via Dashboard do Stripe atualizam automaticamente para `refunded` via webhook.
- Pagamentos manuais reembolsados devem ser marcados manualmente pelo admin.

---

### 1.6 Interações (Interactions)

#### RN21 — Vinculação polimórfica
- Toda interação está vinculada a **um lead OU um cliente** (nunca ambos, nunca nenhum).
- Quando um lead é convertido em cliente, as interações **permanecem vinculadas ao lead** (não migram).

#### RN22 — Imutabilidade parcial
- O admin pode **editar** o resumo (`summary`) de uma interação, mas não pode alterar `type` ou `occurred_at`.
- Para corrigir tipo ou data, deletar e recriar.

---

### 1.7 Dashboard

#### RN23 — Período padrão
- Ao carregar o dashboard, o período padrão é o **mês corrente**.
- Filtros disponíveis: mês corrente, trimestre corrente, ano corrente, customizado.

#### RN24 — Cálculo de taxa de conversão
- **Fórmula:** `(leads em estado 'won' no período) / (total de leads criados no período) * 100`
- Exibida com 1 casa decimal (ex.: `5,3%`).

#### RN25 — Cálculo de MRR (Monthly Recurring Revenue)
- No MVP, MRR é calculado **apenas sobre contratos ativos com tipo de serviço `maintenance`**.
- Outros tipos (website, app, ai_automation) são considerados receita única (não recorrente).
- Fórmula: `SUM(total_value_usd / meses_de_duração)` para contratos `maintenance` ativos.
- ⚠️ Implementação simplificada no MVP: assumir 12 meses de duração se não houver `expected_delivery_date`.

---

## 2. Regras de UI/UX (Interface)

### 2.1 Princípios Gerais

#### UX01 — Clareza acima de tudo
- Cada tela responde a uma única pergunta: "O que o admin precisa fazer aqui?"
- Evite sobrecarga: máximo de 1 ação primária por tela (botão CTA principal).

#### UX02 — Feedback imediato
- Toda ação deve ter retorno visual em até 200ms:
  - Loading spinner
  - Toast de sucesso/erro
  - Skeleton em listas

#### UX03 — Estados vazios (Empty States)
- Listas vazias **nunca** mostram apenas "Nenhum dado".
- Devem incluir:
  - Ilustração ou ícone
  - Mensagem amigável em pt-BR
  - CTA para criar o primeiro registro

#### UX04 — Confirmação para ações destrutivas
- Exclusões, cancelamentos e movimentação para "Perdido" devem exigir confirmação via modal.
- Modal deve mostrar **o que será afetado** (ex.: "Excluir cliente João removerá 3 contratos vinculados").

### 2.2 Componentes

#### UX05 — Padrão de formulários
- Labels acima dos campos (não dentro do placeholder).
- Mensagens de erro **abaixo** do campo, em vermelho.
- Botão de submit no canto inferior direito.
- Botão "Cancelar" à esquerda, secundário.

#### UX06 — Padrão de tabelas
- Coluna de ações sempre **à direita**.
- Paginação inferior para listas com 25+ itens.
- Busca e filtros no topo.
- Ordenação clicável nos cabeçalhos das colunas relevantes.

#### UX07 — Padrão de cards (Kanban)
- Card de lead deve mostrar:
  - Nome (negrito)
  - Score de qualificação (badge colorido: verde 70+, amarelo 40-69, cinza <40)
  - Origem (badge pequeno)
  - Última interação (data relativa: "há 2 dias")
- Hover deve revelar ações rápidas (editar, mover, excluir).

#### UX08 — Padrão de toasts
- **Sucesso:** verde, ícone de check, 3 segundos
- **Erro:** vermelho, ícone de X, 5 segundos (mais tempo para ler)
- **Info:** azul, ícone de info, 4 segundos
- **Warning:** amarelo, ícone de triângulo, 4 segundos

### 2.3 Identidade Visual (Visual Identity)

#### UX09 — Paleta de cores
A paleta deve ser definida via Tailwind config. Sugestão inicial:
- **Primary:** azul tecnológico (#2563EB ou similar)
- **Success:** verde (#16A34A)
- **Warning:** amarelo (#EAB308)
- **Danger:** vermelho (#DC2626)
- **Neutral:** cinzas para texto e bordas

> ⚠️ A paleta final deve seguir a identidade visual já existente do site `zavo.digital`.

#### UX10 — Tipografia
- Fonte principal: **Inter** ou **Geist Sans** (importar via `next/font`)
- Hierarquia clara: H1 > H2 > H3 > body
- Tamanho mínimo de texto: 14px

#### UX11 — Modo claro como padrão
- Sistema padrão em modo claro (light mode).
- Modo escuro (dark mode) é **opcional** no MVP — pode ser adiado.

### 2.4 Responsividade

#### UX12 — Prioridade desktop
- Sistema é **otimizado para desktop** (admin trabalha em computador).
- Tablet (≥768px) deve funcionar bem.
- Mobile (<768px) deve **não quebrar visualmente**, mas funcionalidades complexas (Kanban) podem ter UX simplificada.

### 2.5 Acessibilidade (Accessibility)

#### UX13 — Padrões mínimos (WCAG 2.1 AA)
- Contraste de texto mínimo: 4.5:1
- Todo input deve ter `<label>` associado (mesmo que visualmente oculto)
- Navegação por teclado deve funcionar em 100% dos componentes
- Botões e links devem ter texto descritivo (não apenas ícones sem `aria-label`)

---

## 3. Regras de Segurança (Security Rules)

### 3.1 Autenticação e Sessão

#### SEC01 — Login único
- Apenas o admin tem acesso. Não há cadastro público no MVP.
- Conta do admin é criada **manualmente** via Supabase Dashboard ou seed.

#### SEC02 — Senha forte
- Mínimo: 12 caracteres, com letra maiúscula, número e símbolo.
- Validação no frontend e via Supabase Auth.

#### SEC03 — Sessão
- Sessão expira em **7 dias** de inatividade.
- Logout invalida o token imediatamente.

#### SEC04 — Recuperação de senha
- Link de reset expira em **1 hora**.
- Após uso, link é invalidado.

### 3.2 Autorização

#### SEC05 — RLS obrigatório
- **Toda tabela** do schema deve ter Row Level Security habilitado.
- Políticas devem garantir que apenas o `owner_id == auth.uid()` acesse os registros.
- Não usar `service_role_key` no frontend **em nenhuma circunstância**.

#### SEC06 — Proteção de rotas
- Middleware Next.js (`middleware.ts`) verifica autenticação em **todas** as rotas exceto:
  - `/login`
  - `/reset-password`
  - `/api/webhooks/*` (validação por assinatura, não por sessão)

### 3.3 Validação de Dados

#### SEC07 — Validação dupla
- Toda entrada do usuário é validada com Zod no **client** e no **server**.
- Servidor é a fonte de verdade — frontend é apenas UX.

#### SEC08 — Sanitização
- Campos de texto livre (notes, summary) são exibidos com escaping de HTML por padrão (React já faz isso).
- **Nunca** use `dangerouslySetInnerHTML` sem sanitização explícita (DOMPurify).

### 3.4 Webhooks

#### SEC09 — Validação de assinatura
- Webhook do Stripe: validar com `STRIPE_WEBHOOK_SECRET` (`stripe.webhooks.constructEvent`).
- Webhook do Apify: validar token customizado configurado no header (`x-apify-webhook-secret`).
- Webhooks com assinatura inválida retornam **401 Unauthorized**.

#### SEC10 — Idempotência
- Webhooks devem ser idempotentes: processar o mesmo evento 2x não deve duplicar dados.
- Usar `event.id` (Stripe) ou `apify_run_id` (Apify) como chave de deduplicação.

### 3.5 Variáveis de Ambiente

#### SEC11 — Segredos no servidor apenas
- Chaves com prefixo `NEXT_PUBLIC_` são expostas no cliente — **apenas** para chaves públicas (anon key, publishable key).
- Chaves sensíveis (service role, secret keys, API tokens) **nunca** começam com `NEXT_PUBLIC_`.

#### SEC12 — `.env.local` no `.gitignore`
- Arquivo `.env.local` **nunca** é commitado.
- `.env.example` deve listar todas as variáveis com valores fictícios para referência.

### 3.6 Logs e Privacidade

#### SEC13 — Não logar dados sensíveis
- **Nunca** logar:
  - Senhas (mesmo hasheadas)
  - Tokens (Stripe, Apify, Anthropic, JWT)
  - Conteúdo completo de e-mails ou mensagens privadas
- Logs devem incluir apenas IDs e metadados não-sensíveis.

#### SEC14 — Tratamento de erros em produção
- Mensagens de erro para o usuário são **genéricas e amigáveis** ("Algo deu errado, tente novamente").
- Detalhes técnicos (stack trace, query SQL) **nunca** vão para o frontend em produção.
- Logs detalhados ficam em ferramenta de monitoramento (Vercel Logs, Sentry futuro).

### 3.7 Upload de Arquivos

#### SEC15 — Comprovantes de pagamento
- Tipos permitidos: PDF, PNG, JPG, JPEG
- Tamanho máximo: 5 MB
- Armazenamento: Supabase Storage com RLS habilitado
- Nome do arquivo é renomeado com UUID antes de salvar (não preservar nome original)

---

## 4. Regras de Integração com IA (AI Integration Rules)

### IA01 — Modelo padrão
- Modelo padrão para enriquecimento de leads: `claude-haiku-4-5` (econômico).
- Mudança de modelo deve ser registrada como decisão (ADR).

### IA02 — Cache obrigatório
- Resultado de cada chamada de IA é armazenado no banco (`leads.ai_summary`, `leads.qualification_score`, `leads.ai_approach_suggestion`).
- **Nunca** fazer chamada de IA repetida para o mesmo dado sem motivo explícito.

### IA03 — Prompt versionado
- Prompts ficam em `lib/anthropic/prompts.ts` com versão no comentário.
- Mudanças significativas em prompts incrementam a versão (ex.: `v1`, `v2`).

### IA04 — Tratamento de falha
- Falha na chamada de IA **não bloqueia** a importação do lead.
- Lead é importado normalmente; campo de score fica `NULL` e pode ser regerado depois.

### IA05 — Limite de tokens
- Configurar `max_tokens` adequado para qualificação de leads (sugestão: 500 tokens de output).
- Inputs muito longos devem ser truncados ou sumarizados antes do envio.

---

## 5. Regras Operacionais (Operations Rules)

### OP01 — Deploy
- **Branch principal (`main`):** apenas merges via PR aprovado.
- Deploy automático para produção ao fazer merge em `main` (Vercel).
- PRs geram preview deployments automáticos.

### OP02 — Backups
- Supabase deve ter backups automáticos diários habilitados.
- Backup manual antes de qualquer migration destrutiva (drop, alter de tipo).

### OP03 — Migrations
- Toda mudança no schema é uma nova migration em `supabase/migrations/`.
- **Nunca** editar migrations já aplicadas em produção.
- Nomenclatura: `YYYYMMDDHHMMSS_descricao_curta.sql`

### OP04 — Versionamento
- Tag semântica em releases: `v0.1.0`, `v0.2.0`, `v1.0.0`.
- `v1.0.0` marca o fim do MVP.

---

## 6. Decisões em Aberto (Open Decisions)

Itens que precisam de definição antes ou durante o desenvolvimento:

| # | Decisão | Status |
|---|---------|--------|
| D01 | Paleta de cores final (alinhar com `zavo.digital`) | Pendente |
| D02 | Logo e identidade visual | Pendente |
| D03 | Quais atores específicos do Apify usar (Google Maps? LinkedIn?) | Pendente |
| D04 | Texto dos prompts de IA para qualificação | Pendente |
| D05 | Texto dos templates de e-mail (Resend) | Pendente |

Cada decisão tomada deve gerar um ADR (Architecture Decision Record) em `docs/decisions/`.

---

**Última atualização:** Maio 2026
**Versão:** 1.0 (MVP)
