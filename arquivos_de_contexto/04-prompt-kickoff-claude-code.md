# Prompt de Kickoff — Claude Code
## Projeto: Zavo Internal SaaS

> Cole este prompt INTEIRO no início de uma nova sessão do Claude Code.
> Tenha o `02-schema-supabase.sql` já rodado no Supabase antes de começar.

---

## CONTEXTO DO PROJETO

Você vai construir o **Zavo Internal**, um SaaS interno single-tenant que faz duas coisas:

1. **CRM pessoal** pra o owner (Irineu) gerenciar clientes, contratos, agendamentos.
2. **Motor de prospecção autônoma** que coleta leads via Apify, qualifica e aborda via Claude API, e agenda reuniões.

**Owner único:** Irineu Fernandes. Não é multi-tenant comercial — mas o schema é multi-tenant ready (toda tabela tem `owner_id`).

---

## STACK OBRIGATÓRIA

```
Frontend:    Next.js 15 (App Router) + TypeScript + Tailwind CSS + shadcn/ui
Backend:     Next.js API Routes + Vercel Edge Functions
DB:          Supabase (Postgres + RLS + pgvector + Storage + Realtime)
Auth:        Supabase Auth (Google OAuth)
LLM:         Claude API (claude-sonnet-4-5 padrão, claude-haiku-4-5 pra tarefas baratas)
Embeddings:  Voyage AI (voyage-3-lite, 1024 dimensões)
E-mail:      Resend
WhatsApp:    Z-API ou Evolution API
Scraping:    Apify (orquestrado pelo n8n)
Automação:   n8n (workflows externos, NÃO dentro do Next.js)
Deploy:      Vercel
Obs:         Sentry + PostHog
```

**REGRAS:**
- Nada de Prisma. Use **Drizzle ORM** ou Supabase JS client direto.
- Nada de Redux/Zustand pra estado global. Use **React Server Components** + URL state + `useState` local.
- Nada de CSS custom. **Tailwind + shadcn/ui apenas.**
- Nada de chamada direta ao DB do client. Toda mutação passa por Server Action ou API Route.
- **RLS ATIVO** em todas as tabelas. Service role key SÓ em Edge Functions controladas.

---

## ESTRUTURA DE PASTAS

```
zavo-internal/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── callback/route.ts
│   ├── (dashboard)/
│   │   ├── layout.tsx
│   │   ├── page.tsx                    # dashboard com métricas
│   │   ├── clientes/
│   │   │   ├── page.tsx                # lista
│   │   │   ├── [id]/page.tsx           # detalhe
│   │   │   └── novo/page.tsx
│   │   ├── prospects/
│   │   │   ├── page.tsx                # kanban
│   │   │   ├── [id]/page.tsx
│   │   │   └── importar/page.tsx       # CSV upload
│   │   ├── campanhas/
│   │   │   ├── page.tsx
│   │   │   ├── [id]/page.tsx
│   │   │   └── nova/page.tsx
│   │   ├── inbox/page.tsx              # mensagens (fila + enviadas)
│   │   ├── agenda/page.tsx
│   │   ├── contratos/page.tsx
│   │   ├── ajustes/
│   │   │   ├── prompts/page.tsx
│   │   │   ├── integracoes/page.tsx
│   │   │   └── custos/page.tsx
│   ├── api/
│   │   ├── webhooks/
│   │   │   ├── resend/route.ts         # tracking de e-mail
│   │   │   ├── whatsapp/route.ts
│   │   │   └── apify/route.ts
│   │   ├── unsubscribe/route.ts        # PÚBLICO, sem auth (LGPD)
│   │   ├── ai/
│   │   │   ├── qualify/route.ts        # qualifica prospect
│   │   │   ├── generate-email/route.ts # streaming
│   │   │   └── classify-reply/route.ts
│   │   └── n8n/
│   │       └── trigger/route.ts        # n8n chama esse endpoint
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/                             # shadcn/ui (Button, Card, etc)
│   ├── prospects/
│   ├── clientes/
│   ├── campanhas/
│   ├── dashboard/
│   └── shared/
├── lib/
│   ├── supabase/
│   │   ├── client.ts                   # browser client
│   │   ├── server.ts                   # server client (RSC)
│   │   └── middleware.ts               # session refresh
│   ├── ai/
│   │   ├── claude.ts                   # wrapper Anthropic SDK
│   │   ├── voyage.ts                   # embeddings
│   │   └── prompts/
│   │       ├── qualify.ts
│   │       ├── generate-email.ts
│   │       └── classify-reply.ts
│   ├── integrations/
│   │   ├── resend.ts
│   │   ├── whatsapp.ts
│   │   ├── google-calendar.ts
│   │   └── apify.ts
│   ├── lgpd/
│   │   ├── unsubscribe.ts
│   │   └── audit-log.ts
│   └── utils.ts
├── types/
│   └── database.types.ts               # gerado via `supabase gen types`
├── middleware.ts                       # auth middleware
├── next.config.js
├── tailwind.config.ts
├── components.json                     # shadcn config
└── package.json
```

---

## FASE 1 — SETUP INICIAL (Dia 1)

Execute nesta ordem:

```bash
# 1. Criar projeto
npx create-next-app@latest zavo-internal --typescript --tailwind --app --src-dir=false

# 2. Dependências
cd zavo-internal
npm install @supabase/ssr @supabase/supabase-js
npm install @anthropic-ai/sdk
npm install resend
npm install zod
npm install date-fns
npm install lucide-react
npm install @sentry/nextjs
npm install posthog-js posthog-node

# 3. shadcn/ui
npx shadcn@latest init
npx shadcn@latest add button card input label form table dialog sheet badge tabs select textarea toast dropdown-menu

# 4. Variáveis de ambiente (.env.local)
```

Crie o `.env.local`:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=             # APENAS em Edge Functions

# Anthropic
ANTHROPIC_API_KEY=

# Voyage AI
VOYAGE_API_KEY=

# Resend
RESEND_API_KEY=
RESEND_WEBHOOK_SECRET=

# WhatsApp (Z-API)
ZAPI_INSTANCE_ID=
ZAPI_TOKEN=

# Apify
APIFY_TOKEN=

# Google
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Observabilidade
SENTRY_DSN=
NEXT_PUBLIC_POSTHOG_KEY=

# n8n
N8N_WEBHOOK_SECRET=                    # para validar requests vindas do n8n

# Domínio
NEXT_PUBLIC_APP_URL=https://zavo.app
```

---

## FASE 2 — AUTH + LAYOUT (Dia 2)

1. Configurar Supabase Auth com Google OAuth.
2. Criar `middleware.ts` que protege todas as rotas `(dashboard)/*`.
3. Layout do dashboard com sidebar (shadcn `Sheet` no mobile, fixed no desktop).
4. Trocar de tema escuro/claro (next-themes).

**Critério de aceite:** Login com Google funciona. Acessar `/dashboard` sem login redireciona pra `/login`.

---

## FASE 3 — CRUD DE PROSPECTS (Dias 3–5)

1. Página `/prospects` com kanban (colunas = `prospect_status` enum).
2. Drag-and-drop entre colunas (use `@dnd-kit/core`).
3. Página `/prospects/[id]` com timeline de mensagens, dados de enriquecimento, score.
4. Página `/prospects/importar` com upload de CSV (use `papaparse`).
5. Validação Zod em todas as Server Actions.
6. **Audit log automático** em todas as mutações.

**Critério de aceite:** Importar 50 prospects via CSV funciona. Mover entre colunas persiste no DB.

---

## FASE 4 — INTEGRAÇÃO CLAUDE API (Dias 6–8)

Crie `lib/ai/claude.ts`:

```typescript
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

export async function qualifyProspect(prospect: Prospect, icp: string) {
  const response = await client.messages.create({
    model: 'claude-sonnet-4-5',
    max_tokens: 1024,
    system: 'Você é um especialista em qualificação B2B...',
    messages: [{
      role: 'user',
      content: `ICP: ${icp}\n\nProspect: ${JSON.stringify(prospect)}\n\nRetorne JSON: {score: 0-100, reason: string, qualified: boolean}`
    }]
  });
  // log uso em ai_usage_log
  // parse e retorne
}

export async function* generateEmail(prospect: Prospect, prompt: string) {
  const stream = await client.messages.stream({
    model: 'claude-sonnet-4-5',
    max_tokens: 1500,
    system: prompt,
    messages: [{ role: 'user', content: JSON.stringify(prospect) }]
  });

  for await (const chunk of stream) {
    if (chunk.type === 'content_block_delta') {
      yield chunk.delta.text;
    }
  }
}
```

**Critério de aceite:** Endpoint `/api/ai/qualify` qualifica 1 prospect. `/api/ai/generate-email` faz streaming de e-mail.

---

## FASE 5 — FILA DE APROVAÇÃO + ENVIO (Dias 9–11)

1. Tabela `messages` já existe. Crie UI em `/inbox` com 3 abas: `awaiting_approval`, `queued`, `sent`.
2. Botão "Aprovar selecionados" em massa.
3. Server Action que muda `status` de `awaiting_approval` → `approved` + define `scheduled_for`.
4. Cron Vercel (ou n8n) chama `/api/n8n/send-approved` a cada 15min:
   - Busca messages `approved` com `scheduled_for <= now`.
   - Envia via Resend.
   - Atualiza `status='sent'`.

**Critério de aceite:** Gerar 5 e-mails, aprovar em lote, enviar pra e-mails reais (testes), receber tracking de abertura.

---

## FASE 6 — UNSUBSCRIBE + LGPD (Dia 12)

1. Endpoint público `/api/unsubscribe?token=xxx` (sem auth).
2. Toda template de e-mail tem footer: `<a href="{{unsubscribe_url}}">Descadastrar</a>`.
3. Geração do token usa `unsubscribe_tokens` table.
4. Trigger no DB (já criado no schema) bloqueia envios pra prospects com `consent_status='revoked'`.

**Critério de aceite:** Clicar no link de descadastro num e-mail real → marca prospect como revoked → próxima mensagem outbound falha.

---

## FASE 7 — CAMPANHAS + N8N (Dias 13–15)

1. UI pra criar campanha: ICP, prompts, canais, cadência.
2. n8n workflow: cron diário → Apify → POST `/api/n8n/import-prospects` (validado por `N8N_WEBHOOK_SECRET`).
3. n8n workflow: a cada 30min → pega prospects `new` → chama `/api/ai/qualify` em batch → atualiza.

**Critério de aceite:** Criar campanha, n8n roda, prospects entram, qualificação acontece, e-mails ficam em fila.

---

## FASE 8 — DASHBOARD + GOOGLE CALENDAR (Dias 16–18)

1. Dashboard com cards: total prospects, qualificados hoje, e-mails enviados, taxa de abertura, reuniões agendadas.
2. Charts simples com `recharts`.
3. Detecção de resposta com intenção "agendar reunião" → cria evento no Google Calendar via API.

**Critério de aceite:** Dashboard mostra dados reais. Reunião criada automaticamente quando prospect responde aceitando.

---

## FASE 9 — POLIMENTO + DEPLOY (Dias 19–21)

1. Sentry configurado.
2. PostHog rastreando eventos chave.
3. Loading states + error boundaries em tudo.
4. Deploy Vercel + domínio custom.
5. Documentação básica em `/README.md`.

---

## REGRAS DE OURO

1. **Toda mutação no DB passa por Zod.** Nada de input não validado.
2. **Toda chamada de IA loga em `ai_usage_log`.** Saber custo é vital.
3. **Toda ação importante loga em `audit_log`.** LGPD.
4. **Nada de `any` em TypeScript.** Use `unknown` + narrowing.
5. **Componentes <200 linhas.** Acima disso, quebra.
6. **Server Components por padrão.** `'use client'` só quando precisa de interatividade.
7. **Error boundaries em cada rota.** Crash não pode derrubar a app.
8. **Skeleton loading em tudo.** Nada de spinner genérico.
9. **Mobile-first.** Owner usa mobile pra revisar fila.
10. **Em caso de dúvida, pergunte.** Não inventa requisito.

---

## ANTI-REGRAS (NÃO FAÇA)

- ❌ Não use Prisma.
- ❌ Não use Redux.
- ❌ Não use CSS modules ou styled-components.
- ❌ Não chame Anthropic API direto do browser.
- ❌ Não exponha `SUPABASE_SERVICE_ROLE_KEY` em código client.
- ❌ Não crie microsserviços.
- ❌ Não implemente features SHOULD/COULD do PRD antes do MUST estar 100%.
- ❌ Não deixe RLS desativada "temporariamente". Nunca volta.

---

## ENTREGÁVEL FINAL

Ao final dos 21 dias:
- App em produção em `https://zavo.app` (ou similar).
- 1 campanha rodando em modo sombra com 50 prospects reais qualificados.
- Pelo menos 10 e-mails reais enviados e trackeados.
- Documentação `/docs/runbook.md` explicando como debugar problemas comuns.
- Checklist de LGPD assinado pelo owner.

---

**Comece confirmando que entendeu o escopo e me peça pra rodar o `02-schema-supabase.sql` no Supabase antes de você criar a primeira linha de código.**
