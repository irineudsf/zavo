# ADR — Zavo Internal SaaS
**Architecture Decision Record (Registro de Decisões de Arquitetura)**

**Projeto:** Zavo — Sistema interno de gestão + prospecção automatizada
**Data:** 05/05/2026
**Status:** Aprovado para implementação
**Autor:** Arquiteto Sênior | Owner: Irineu Fernandes

---

## 1. Contexto

A Zavo é uma empresa one-person business (negócio de uma pessoa só) que vende websites, sistemas e soluções de IA. O fundador (Irineu) precisa de um SaaS interno que cumpra dois papéis:

1. **ERP pessoal:** gestão de clientes, contratos, agendamentos.
2. **Motor de prospecção autônoma:** coleta de leads via Apify, qualificação por IA, abordagem multicanal (e-mail, WhatsApp, LinkedIn) e agendamento automático de reuniões.

**Princípio guia:** uma pessoa só, operando com IA como força de trabalho.

---

## 2. Decisões Arquiteturais

### ADR-001 — Single-tenant com schema multi-tenant ready

**Decisão:** Aplicação single-tenant (um único usuário: Irineu), mas com schema modelado como se fosse multi-tenant desde o dia zero.

**Motivo:** Custo zero hoje, opcionalidade amanhã. Toda tabela nasce com `owner_id uuid references auth.users`. Se um dia virar produto vendável, basta liberar signup e ajustar RLS — sem refatorar dados.

**Trade-offs:**
- ✅ Migração futura quase grátis.
- ✅ RLS (Row Level Security) já protege contra bugs de vazamento de dados.
- ❌ Pequeno overhead de uma coluna extra por tabela.

---

### ADR-002 — Monolito modular Next.js, sem microsserviços

**Decisão:** Um único projeto Next.js 15 com App Router. Módulos separados por pasta: `clientes/`, `contratos/`, `agenda/`, `prospeccao/`, `agents/`.

**Motivo:** Você é uma pessoa só. Microsserviços são complexidade desnecessária. Cal.com, Linear e Resend rodam monolitos modulares em escala muito maior.

**Trade-offs:**
- ✅ Deploy único, debug único, mental model único.
- ✅ Type-safety end-to-end com TypeScript + Drizzle ou Prisma.
- ❌ Quando crescer absurdamente (improvável), vai precisar quebrar — mas isso é problema de 2027+.

---

### ADR-003 — Supabase como espinha dorsal (DB + Auth + Storage + Realtime)

**Decisão:** Supabase Pro como banco Postgres, autenticação, storage de arquivos (contratos PDF, anexos) e Realtime (atualizações ao vivo do dashboard).

**Motivo:**
- Postgres puro (não é abstração proprietária).
- RLS nativo (segurança no banco, não na aplicação).
- pgvector instalado por padrão (busca semântica).
- Edge Functions pra lógica server-side leve.
- Auth com magic link + Google OAuth pronto.

**Trade-offs:**
- ✅ Stack consolidada, documentação excelente, comunidade grande.
- ✅ Vendor lock-in mínimo (é Postgres, dá pra exportar).
- ❌ Edge Functions têm timeout de 150s — operações longas vão pro n8n.

---

### ADR-004 — n8n como orquestrador de agentes de prospecção

**Decisão:** Toda automação de prospecção (Apify → enriquecimento → qualificação → envio → follow-up) roda em workflows n8n. A aplicação Next.js é a interface de controle (dashboard) e o banco é a fonte da verdade.

**Motivo:**
- Workflows visuais, retry automático, agendamento (cron).
- Irineu já domina n8n.
- Separação clara: app Next.js cuida de UI/dados, n8n cuida de operações longas e integrações.
- Edge Functions ficam pra coisas síncronas e rápidas.

**Trade-offs:**
- ✅ Mudanças em workflows sem deploy.
- ✅ Logs visuais, fácil debug.
- ❌ Mais um sistema pra manter. Mitigação: n8n cloud ou self-hosted que você já roda.

**Fluxo concreto:**
```
n8n (cron diário) →
  Apify (scrape) →
  Supabase (insert prospects) →
  Claude API (qualificação + geração de copy) →
  Supabase (update status = ready_to_send) →
  [janela de aprovação 2 semanas / autônomo depois] →
  Resend/WhatsApp (envio) →
  Supabase (log de envio)
```

---

### ADR-005 — Claude API (Sonnet 4.5) como LLM padrão

**Decisão:** Claude Sonnet 4.5 (`claude-sonnet-4-5`) como modelo principal pra geração de copy, qualificação de leads e respostas a follow-up.

**Motivo:**
- Melhor custo-benefício pra português brasileiro nativo.
- Tool use (chamada de funções) maduro pra integração com Supabase via MCP.
- Prompt caching reduz custo em ~60% em prompts repetitivos (system prompts grandes).

**Modelos secundários:**
- **Claude Haiku 4.5** pra tarefas baratas em massa (classificação de e-mails de resposta).
- **Voyage-3-lite** pra embeddings (vetores semânticos) — mais barato que OpenAI.
- **Whisper** se for transcrever reuniões.

**Trade-offs:**
- ✅ Qualidade de copy em PT-BR superior.
- ❌ Dependência de uma única API. Mitigação: abstração via interface `LLMProvider` que aceita troca futura.

---

### ADR-006 — RLS desde o dia zero

**Decisão:** Toda tabela do Supabase nasce com Row Level Security ATIVADA e política padrão `auth.uid() = owner_id`.

**Motivo:** Mesmo sendo single-tenant, RLS protege contra:
- Bugs em queries (vazamento entre tenants no futuro).
- Acesso indevido via Supabase API REST (auto-gerada).
- Tokens vazados (atacante só vê dados do próprio user).

**Trade-offs:**
- ✅ Segurança em camada de banco, não de aplicação.
- ❌ Queries complexas exigem `security definer functions` em alguns casos.

---

### ADR-007 — LGPD: tratamento explícito de dados de prospects

**Decisão:** Toda tabela `prospects` carrega:
- `lawful_basis` (base legal): default `'legitimate_interest_b2b'`.
- `consent_status`: `pending | granted | revoked`.
- `source` (origem do dado): URL ou nome do scraper.
- `collected_at`: timestamp.
- `data_retention_until`: data de expurgo automático (default: collected_at + 18 meses).

Todo e-mail enviado inclui link de opt-out (descadastro). Endpoint público `/api/unsubscribe?token=xxx` marca `consent_status = 'revoked'` e bloqueia futuros envios.

**Motivo:** LGPD se aplica a dados pessoais de prospects mesmo em B2B. Legítimo interesse exige documentação e mecanismo de oposição (opt-out).

**Trade-offs:**
- ✅ Conformidade legal desde o dia zero.
- ✅ Auditoria fácil (quem, quando, por quê).
- ❌ ~5 colunas extras + 1 endpoint. Custo: 2h de dev.

---

### ADR-008 — Modo aprovação obrigatório nos primeiros 14 dias

**Decisão:** Apesar do owner ter pedido modo autônomo, os primeiros 14 dias rodam em **modo sombra**: IA gera abordagens, deixa em fila com status `awaiting_approval`. Owner aprova em lote pelo dashboard. Após 14 dias, switch global libera autônomo.

**Motivo:** calibração de prompts, evitar queima de domínio (warmup), validar tom da marca antes de escalar.

**Trade-offs:**
- ✅ Risco reputacional e técnico controlado.
- ❌ Atrasa autonomia plena em 2 semanas. Aceitável.

---

### ADR-009 — Vercel Pro para deploy + Edge Functions

**Decisão:** Vercel Pro como host. Edge Functions pra streaming de respostas Claude. Preview Deployments por branch.

**Motivo:** integração nativa com Next.js, edge computing global, zero config de CI/CD.

**Trade-offs:**
- ✅ DX (Developer Experience - experiência do desenvolvedor) imbatível.
- ❌ Custo escala com bandwidth. Mitigação: cache agressivo + CDN.

---

### ADR-010 — Stack de observabilidade

**Decisão:**
- **Sentry** pra erros (frontend + backend).
- **PostHog** pra analytics e feature flags.
- **Logflare** ou **Axiom** pra logs estruturados das Edge Functions e n8n.

**Motivo:** sem observabilidade, debug em produção vira adivinhação. Os 3 têm free tier generoso.

---

## 3. Stack Consolidada

```
┌─────────────────────────────────────────────────────┐
│                    USUÁRIO (Irineu)                 │
└──────────────────────┬──────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────┐
│      VERCEL — Next.js 15 (App Router) + Tailwind   │
│      • Dashboard de gestão                          │
│      • Edge Functions (streaming Claude)            │
│      • shadcn/ui                                    │
└──────────────────────┬──────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│  SUPABASE    │ │  CLAUDE API  │ │     N8N      │
│  • Postgres  │ │  • Sonnet4.5 │ │  • Workflows │
│  • Auth      │ │  • Haiku 4.5 │ │  • Cron      │
│  • Storage   │ │  • Caching   │ │  • Retries   │
│  • Realtime  │ │              │ │              │
│  • pgvector  │ │              │ │              │
└──────────────┘ └──────────────┘ └──────┬───────┘
                                         │
                ┌────────────────────────┼────────────────┐
                ▼                        ▼                ▼
         ┌────────────┐          ┌────────────┐    ┌────────────┐
         │   APIFY    │          │   RESEND   │    │  Z-API /   │
         │  (scrape)  │          │  (e-mail)  │    │ Evolution  │
         └────────────┘          └────────────┘    │ (WhatsApp) │
                                                   └────────────┘
```

---

## 4. Custos Projetados (mensal, em USD)

| Faixa de uso | Supabase | Vercel | Claude API | Apify | Resend | WhatsApp | Total |
|---|---|---|---|---|---|---|---|
| **Mês 1** (calibração) | $25 | $0 | $30 | $49 | $0 | $30 | **$134** |
| **Mês 3** (operação plena) | $25 | $20 | $80 | $99 | $20 | $50 | **$294** |
| **Mês 6** (volume alto) | $25 | $20 | $150 | $199 | $20 | $80 | **$494** |

ROI esperado: 1 cliente fechado pra Zavo no ticket médio de $1.500–5.000 paga 6 meses de stack.

---

## 5. Riscos e Mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| Domínio queimado por spam | Alta | Alto | Warmup de 14 dias + SPF/DKIM/DMARC + opt-out em todo e-mail |
| Apify quebrar (mudança de seletores) | Média | Médio | Múltiplos actors + fallback manual via CSV |
| Custo de Claude escalando demais | Baixa | Médio | Prompt caching + Haiku pra tarefas simples + budget alerts |
| Vazamento de dados de prospects | Baixa | Alto | RLS + pseudonimização em logs + retenção limitada |
| n8n cair em momento crítico | Média | Médio | Health check + alertas + workflows idempotentes |
