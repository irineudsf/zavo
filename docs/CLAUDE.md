# CLAUDE.md — Contexto do Projeto Zavo

> **Arquivo principal de contexto para Claude Code.**
> Leia este arquivo **antes** de qualquer tarefa. Ele define stack, convenções, estrutura e regras inegociáveis do projeto.

---

## 1. Visão Geral do Projeto (Project Overview)

**Zavo** é o sistema interno de gestão comercial da **Zavo Tech**, empresa de tecnologia que vende websites, aplicativos e automação com IA para pequenas e médias empresas.

O sistema é operado por **um único administrador** (Irineu) e centraliza:

- **CRM** — clientes e contratos
- **Pipeline de Leads** — funil Kanban
- **Prospecção Automática** — Apify + IA (Anthropic Claude)
- **Pagamentos** — Stripe + registro manual
- **Dashboard** — métricas comerciais

**Domínio em produção:** `zavo.digital` (hospedado na Vercel)

**Documentos relacionados (leia também):**
- `PRD.md` — visão de produto e user stories
- `REQUISITOS.md` — RFs e RNFs detalhados
- `SCHEMA.sql` — modelagem completa do banco
- `REGRAS.md` — regras de negócio e UI/UX
- `ESTRUTURA.md` — árvore de pastas comentada

---

## 2. Stack Tecnológica (Technology Stack)

| Camada | Tecnologia | Versão | Motivo |
|--------|-----------|--------|--------|
| Frontend Framework | Next.js | 15+ (App Router) | SSR, RSC, performance |
| Linguagem | TypeScript | 5.4+ | Tipagem estática obrigatória |
| Estilização | Tailwind CSS | 4+ | Utility-first, produtividade |
| Componentes UI | shadcn/ui | latest | Componentes acessíveis e customizáveis |
| Banco de Dados | Supabase (PostgreSQL) | latest | Auth + RLS + Realtime |
| Autenticação | Supabase Auth | latest | Integrado ao banco |
| Validação | Zod | 3+ | Schema validation client + server |
| Formulários | React Hook Form | 7+ | Performance e DX |
| Drag-and-Drop | dnd-kit | latest | Para o pipeline Kanban |
| Pagamentos | Stripe | API 2024+ | Payment Links + Webhooks |
| Prospecção | Apify | API v2 | Web scraping de leads |
| IA | Anthropic API | claude-haiku-4-5 | Enriquecimento e qualificação |
| E-mail Transacional | Resend | latest | Notificações e outreach |
| Hospedagem | Vercel | — | Deploy contínuo via Git |
| Gerenciador de Pacotes | pnpm | 9+ | Performance e disk efficiency |

---

## 3. Convenções de Código (Code Conventions)

### 3.1 Idioma

- **Variáveis, funções, classes, tipos:** **inglês**
  ```typescript
  // ✅ correto
  const fetchClientById = async (clientId: string) => { ... }

  // ❌ errado
  const buscarClientePorId = async (idCliente: string) => { ... }
  ```

- **Comentários no código:** **português brasileiro**
  ```typescript
  // ✅ correto
  // Calcula o score de qualificação do lead via IA
  const calculateLeadScore = ...

  // ❌ errado
  // Calculates the lead qualification score via AI
  ```

- **Mensagens de UI (botões, labels, toasts):** **português brasileiro**
- **Console.log de debug:** pode ser em qualquer idioma, mas remova antes de commitar.

### 3.2 Nomenclatura

| Tipo | Convenção | Exemplo |
|------|-----------|---------|
| Variáveis e funções | `camelCase` | `getClientById`, `leadScore` |
| Componentes React | `PascalCase` | `LeadCard`, `ClientForm` |
| Tipos e Interfaces | `PascalCase` | `Lead`, `ClientStatus`, `PaymentMethod` |
| Constantes globais | `UPPER_SNAKE_CASE` | `MAX_LEADS_PER_SEARCH` |
| Arquivos de componente | `kebab-case.tsx` | `lead-card.tsx`, `client-form.tsx` |
| Arquivos de utilitário | `kebab-case.ts` | `format-currency.ts` |
| Pastas | `kebab-case` | `lead-pipeline`, `apify-actions` |
| Tabelas no banco | `snake_case` plural | `clients`, `apify_searches` |
| Colunas no banco | `snake_case` | `created_at`, `qualification_score` |

### 3.3 Estrutura de Componentes React

```typescript
// 1. Imports (ordem: react > libs externas > componentes > utils > types)
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/utils/format'
import type { Lead } from '@/types'

// 2. Tipos/Props (sempre tipados, sem 'any')
interface LeadCardProps {
  lead: Lead
  onMove: (leadId: string, newStage: string) => void
}

// 3. Componente (default export para páginas, named export para componentes)
export function LeadCard({ lead, onMove }: LeadCardProps) {
  // ... lógica
  return <div>...</div>
}
```

### 3.4 Padrão de Commit (Conventional Commits)

```
<tipo>(<escopo opcional>): <descrição em pt-br no imperativo>

[corpo opcional]

[rodapé opcional]
```

**Tipos permitidos:**
- `feat` — nova funcionalidade
- `fix` — correção de bug
- `docs` — documentação
- `style` — formatação (sem mudança de lógica)
- `refactor` — refatoração
- `perf` — melhoria de performance
- `test` — testes
- `chore` — tarefas de build, configs, dependências

**Exemplos:**
```
feat(leads): adiciona drag-and-drop no pipeline Kanban
fix(stripe): corrige validação de webhook signature
docs(readme): atualiza instruções de setup local
```

### 3.5 ESLint e Prettier

- **ESLint:** configurado com `next/core-web-vitals` + regras de TypeScript estritas
- **Prettier:** formatação automática no save
- **Proibido:** `any`, `// @ts-ignore`, `console.log` em produção

---

## 4. Estrutura de Pastas (Folder Structure)

```
zavo/
├── app/                          # Rotas (Next.js App Router)
│   ├── (auth)/                   # Grupo: rotas de autenticação
│   │   ├── login/
│   │   └── reset-password/
│   ├── (dashboard)/              # Grupo: área logada
│   │   ├── dashboard/
│   │   ├── clients/
│   │   ├── contracts/
│   │   ├── leads/                # Pipeline Kanban
│   │   ├── prospecting/          # Apify + buscas
│   │   ├── payments/
│   │   └── settings/
│   ├── api/                      # API Routes (webhooks, server actions auxiliares)
│   │   ├── webhooks/
│   │   │   ├── stripe/
│   │   │   └── apify/
│   │   └── ai/
│   │       └── enrich-lead/
│   ├── layout.tsx
│   └── page.tsx                  # Landing/redirect
│
├── components/                   # Componentes React reutilizáveis
│   ├── ui/                       # shadcn/ui (button, input, dialog, etc.)
│   ├── layout/                   # Header, Sidebar, Footer
│   ├── clients/
│   ├── leads/
│   ├── pipeline/                 # Componentes do Kanban
│   ├── payments/
│   └── shared/                   # Componentes genéricos (DataTable, EmptyState)
│
├── lib/                          # Bibliotecas, clientes, utilitários
│   ├── supabase/
│   │   ├── client.ts             # Cliente Supabase (browser)
│   │   ├── server.ts             # Cliente Supabase (server)
│   │   └── middleware.ts         # Middleware de auth
│   ├── stripe/
│   │   ├── client.ts
│   │   └── webhook.ts
│   ├── apify/
│   │   ├── client.ts
│   │   └── actors.ts             # Atores Apify mapeados
│   ├── anthropic/
│   │   ├── client.ts
│   │   └── prompts.ts            # Prompts para qualificação de leads
│   ├── resend/
│   │   └── client.ts
│   ├── validations/              # Schemas Zod
│   │   ├── client.ts
│   │   ├── lead.ts
│   │   └── contract.ts
│   └── utils/                    # Utilitários puros
│       ├── format.ts             # formatCurrency, formatDate
│       └── cn.ts                 # className utility
│
├── server/                       # Server Actions (mutations)
│   ├── clients.ts
│   ├── contracts.ts
│   ├── leads.ts
│   ├── apify.ts
│   └── payments.ts
│
├── types/                        # Tipos TypeScript globais
│   ├── database.ts               # Tipos gerados do Supabase
│   └── index.ts
│
├── supabase/                     # Migrations e schema
│   ├── migrations/
│   └── schema.sql                # Cópia do SCHEMA.sql
│
├── public/                       # Assets estáticos
│   └── logo.svg
│
├── docs/                         # Documentação do projeto
│   ├── PRD.md
│   ├── REQUISITOS.md
│   ├── REGRAS.md
│   └── ESTRUTURA.md
│
├── .env.example
├── .env.local                    # (não commitado)
├── .eslintrc.json
├── .gitignore
├── .prettierrc
├── CLAUDE.md                     # Este arquivo
├── README.md
├── components.json               # Config do shadcn/ui
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
├── postcss.config.js
├── tailwind.config.ts
└── tsconfig.json
```

**Detalhamento completo em `ESTRUTURA.md`.**

---

## 5. Como Rodar Localmente (Local Setup)

### Pré-requisitos
- Node.js 20+
- pnpm 9+
- Conta no Supabase, Stripe, Apify, Anthropic, Resend, Vercel

### Passos

```bash
# 1. Clonar o repositório
git clone <repo-url>
cd zavo

# 2. Instalar dependências
pnpm install

# 3. Configurar variáveis de ambiente
cp .env.example .env.local
# Preencher .env.local com as chaves reais

# 4. Aplicar schema no Supabase
# Acesse o SQL Editor do Supabase e execute supabase/schema.sql

# 5. Gerar tipos TypeScript do Supabase
pnpm supabase gen types typescript --project-id <project-id> > types/database.ts

# 6. Rodar em modo dev
pnpm dev

# 7. Acessar
# http://localhost:3000
```

### Variáveis de Ambiente (.env.local)

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Apify
APIFY_API_TOKEN=

# Anthropic
ANTHROPIC_API_KEY=

# Resend
RESEND_API_KEY=

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 6. Padrões Críticos de Implementação

### 6.1 Acesso ao Banco
- **SEMPRE** use o cliente Supabase apropriado:
  - `lib/supabase/server.ts` → em Server Components, Server Actions, Route Handlers
  - `lib/supabase/client.ts` → em Client Components ('use client')
- **NUNCA** exponha a `SUPABASE_SERVICE_ROLE_KEY` no cliente.

### 6.2 Mutations (Criar/Atualizar/Deletar)
- **SEMPRE** via Server Actions em `/server/*.ts`
- **SEMPRE** validar input com Zod antes de tocar no banco
- **SEMPRE** retornar `{ data, error }` tipado

```typescript
// Exemplo de padrão
'use server'

import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'

const createClientSchema = z.object({
  company_name: z.string().min(1),
  contact_name: z.string().min(1),
  email: z.string().email(),
})

export async function createClient(input: z.infer<typeof createClientSchema>) {
  const validated = createClientSchema.parse(input)
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('clients')
    .insert(validated)
    .select()
    .single()

  return { data, error }
}
```

### 6.3 Webhooks (Stripe e Apify)
- **SEMPRE** validar assinatura do webhook
- **SEMPRE** responder com 200 rapidamente (processar em background se demorar)
- **SEMPRE** idempotente (processar mesmo evento várias vezes deve dar mesmo resultado)

### 6.4 Prospecção com IA
- O modelo padrão é `claude-haiku-4-5` (econômico)
- Resultados de IA devem ser **cacheados no banco** (`leads.ai_summary`, `leads.qualification_score`)
- **NUNCA** chamar IA em loop síncrono — sempre em background ou com fila

---

## 7. O Que NÃO Fazer (Do Not / Restrições)

🚫 **NÃO use `any` em TypeScript** — sempre tipos explícitos
🚫 **NÃO escreva SQL inline em componentes** — sempre via `lib/supabase/*` ou Server Actions
🚫 **NÃO desabilite RLS** em nenhuma tabela
🚫 **NÃO commite `.env.local`** — está no `.gitignore` por padrão
🚫 **NÃO use `console.log` em código de produção** — use logging apropriado
🚫 **NÃO crie componentes "God" (genéricos demais)** — prefira componentes pequenos e focados
🚫 **NÃO use CSS inline** — sempre Tailwind ou variantes do shadcn/ui
🚫 **NÃO faça hard-delete** em tabelas com `deleted_at` — use soft delete
🚫 **NÃO esqueça `'use server'` e `'use client'`** nos arquivos corretos
🚫 **NÃO crie rotas sem proteção de autenticação** (exceto `/login` e `/reset-password`)
🚫 **NÃO bloqueie a UI** durante chamadas longas — sempre use loading states
🚫 **NÃO faça requisições à API da Anthropic, Apify ou Stripe direto do client-side** — sempre via Server Actions ou API Routes

---

## 8. Fluxo de Trabalho Recomendado (Workflow)

1. **Antes de codar uma feature:**
   - Releia o PRD e identifique a User Story (US)
   - Releia REQUISITOS e identifique os RFs cobertos
   - Releia SCHEMA para entender as tabelas envolvidas
   - Releia REGRAS para regras de negócio aplicáveis

2. **Durante a implementação:**
   - Crie uma branch: `feat/<nome-da-feature>`
   - Siga as convenções deste arquivo
   - Faça commits pequenos e descritivos

3. **Antes do PR (Pull Request):**
   - Rode `pnpm lint` e `pnpm typecheck`
   - Teste manualmente os cenários do RF
   - Verifique a Definition of Done em `REQUISITOS.md`

4. **Após merge:**
   - Verifique deploy no Vercel preview
   - Promova para produção apenas após validação

---

## 9. Contato e Decisões

- **Product Owner:** Irineu Fernandes
- **Idioma de comunicação:** Português brasileiro (pt-BR)
- **Decisões em aberto** devem ser registradas em `docs/decisions/` com formato ADR (Architecture Decision Record).

---

**Última atualização deste documento:** Maio 2026
**Versão:** 1.0 (MVP)
