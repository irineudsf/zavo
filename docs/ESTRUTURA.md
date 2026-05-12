# ESTRUTURA — Zavo

**Árvore de Pastas (Folder Tree) Comentada**
Versão: 1.0 — MVP
Última atualização: Maio 2026

> Este documento descreve **onde cada coisa mora** no projeto Zavo.
> Sempre que houver dúvida sobre onde criar um arquivo novo, consulte este documento primeiro.

---

## 1. Visão Geral

O projeto segue a estrutura padrão do **Next.js 15 com App Router**, organizada por **funcionalidade (feature-based)** em vez de por tipo de arquivo. Isso significa que componentes, lógica e tipos relacionados ficam próximos.

**Princípios:**
- Pastas em `kebab-case` (ex.: `lead-pipeline`)
- Arquivos de componente em `kebab-case.tsx`
- Imports absolutos com alias `@/*`
- Server-side em `lib/` e `server/`
- UI em `app/` e `components/`

---

## 2. Árvore Completa de Pastas

```
zavo/
│
├── app/                              # 🚀 Rotas (Next.js App Router)
│   │
│   ├── (auth)/                       # Grupo: rotas de autenticação (sem layout do dashboard)
│   │   ├── login/
│   │   │   └── page.tsx              # Tela de login
│   │   ├── reset-password/
│   │   │   ├── page.tsx              # Solicitar reset
│   │   │   └── confirm/
│   │   │       └── page.tsx          # Confirmar nova senha (após link do e-mail)
│   │   └── layout.tsx                # Layout simples (sem sidebar)
│   │
│   ├── (dashboard)/                  # Grupo: área logada (com sidebar e header)
│   │   ├── dashboard/
│   │   │   └── page.tsx              # Dashboard principal com métricas
│   │   ├── clients/
│   │   │   ├── page.tsx              # Listagem de clientes
│   │   │   ├── new/
│   │   │   │   └── page.tsx          # Cadastro de novo cliente
│   │   │   └── [id]/
│   │   │       ├── page.tsx          # Detalhes do cliente
│   │   │       └── edit/
│   │   │           └── page.tsx      # Edição do cliente
│   │   ├── contracts/
│   │   │   ├── page.tsx              # Listagem de contratos
│   │   │   ├── new/
│   │   │   │   └── page.tsx          # Novo contrato
│   │   │   └── [id]/
│   │   │       ├── page.tsx          # Detalhes do contrato
│   │   │       └── edit/
│   │   │           └── page.tsx
│   │   ├── leads/
│   │   │   ├── page.tsx              # Pipeline Kanban (visualização principal)
│   │   │   ├── new/
│   │   │   │   └── page.tsx          # Cadastro manual de lead
│   │   │   └── [id]/
│   │   │       └── page.tsx          # Detalhes do lead
│   │   ├── prospecting/
│   │   │   ├── page.tsx              # Listagem de buscas Apify + dispatcher
│   │   │   └── [id]/
│   │   │       └── page.tsx          # Resultado de uma busca específica
│   │   ├── payments/
│   │   │   ├── page.tsx              # Listagem de pagamentos
│   │   │   └── [id]/
│   │   │       └── page.tsx          # Detalhes do pagamento
│   │   ├── settings/
│   │   │   └── page.tsx              # Configurações do sistema (perfil, integrações)
│   │   └── layout.tsx                # Layout com sidebar + header
│   │
│   ├── api/                          # 🌐 API Routes (apenas para webhooks e endpoints externos)
│   │   ├── webhooks/
│   │   │   ├── stripe/
│   │   │   │   └── route.ts          # Webhook do Stripe (validação + processamento)
│   │   │   └── apify/
│   │   │       └── route.ts          # Webhook do Apify (recebe leads importados)
│   │   └── ai/
│   │       └── enrich-lead/
│   │           └── route.ts          # Endpoint interno para enriquecimento via IA
│   │
│   ├── layout.tsx                    # Layout raiz (HTML, fontes, providers globais)
│   ├── page.tsx                      # Landing/redirect (redireciona para /login ou /dashboard)
│   ├── globals.css                   # Estilos globais (Tailwind)
│   ├── error.tsx                     # Tela de erro global
│   ├── not-found.tsx                 # Tela 404
│   └── loading.tsx                   # Loading global
│
├── components/                       # 🧩 Componentes React reutilizáveis
│   │
│   ├── ui/                           # Componentes shadcn/ui (NÃO editar manualmente)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── form.tsx
│   │   ├── select.tsx
│   │   ├── table.tsx
│   │   ├── tabs.tsx
│   │   ├── toast.tsx
│   │   ├── badge.tsx
│   │   ├── card.tsx
│   │   └── ... (outros conforme necessário)
│   │
│   ├── layout/                       # Componentes de layout
│   │   ├── sidebar.tsx               # Menu lateral
│   │   ├── header.tsx                # Cabeçalho com perfil/logout
│   │   ├── user-menu.tsx             # Dropdown do usuário
│   │   └── nav-item.tsx              # Item de navegação
│   │
│   ├── clients/                      # Componentes específicos de Clientes
│   │   ├── client-form.tsx           # Form de cadastro/edição
│   │   ├── client-list.tsx           # Tabela de listagem
│   │   ├── client-card.tsx           # Card resumido
│   │   ├── client-status-badge.tsx   # Badge de status (prospect/active/inactive)
│   │   └── client-delete-dialog.tsx  # Modal de confirmação de exclusão
│   │
│   ├── contracts/                    # Componentes específicos de Contratos
│   │   ├── contract-form.tsx
│   │   ├── contract-list.tsx
│   │   ├── contract-status-badge.tsx
│   │   └── contract-card.tsx
│   │
│   ├── leads/                        # Componentes específicos de Leads
│   │   ├── lead-form.tsx
│   │   ├── lead-card.tsx             # Card no Kanban
│   │   ├── lead-detail-modal.tsx     # Modal com detalhes
│   │   ├── lead-score-badge.tsx      # Badge colorido do score (0-100)
│   │   ├── lead-source-badge.tsx     # Badge de origem
│   │   └── convert-to-client-dialog.tsx  # Modal de conversão lead → cliente
│   │
│   ├── pipeline/                     # Componentes do Kanban
│   │   ├── kanban-board.tsx          # Board completo
│   │   ├── kanban-column.tsx         # Coluna (estágio)
│   │   ├── kanban-card.tsx           # Card draggable (usa lead-card por dentro)
│   │   └── stage-header.tsx          # Cabeçalho da coluna com contador
│   │
│   ├── prospecting/                  # Componentes de prospecção (Apify)
│   │   ├── search-form.tsx           # Form para disparar busca
│   │   ├── search-list.tsx           # Histórico de buscas
│   │   ├── search-status-badge.tsx
│   │   └── actor-selector.tsx        # Selector de ator Apify
│   │
│   ├── payments/                     # Componentes de pagamentos
│   │   ├── payment-form.tsx          # Cadastro de pagamento manual
│   │   ├── payment-list.tsx
│   │   ├── payment-status-badge.tsx
│   │   ├── stripe-link-button.tsx    # Gerar Payment Link
│   │   └── upload-receipt.tsx        # Upload de comprovante
│   │
│   ├── dashboard/                    # Componentes do dashboard
│   │   ├── metric-card.tsx           # Card de métrica única
│   │   ├── leads-chart.tsx           # Gráfico de linha (leads/dia)
│   │   ├── revenue-chart.tsx         # Gráfico de barras (receita/mês)
│   │   ├── source-pie-chart.tsx      # Gráfico de pizza (origem)
│   │   └── period-filter.tsx         # Filtro de período
│   │
│   ├── interactions/                 # Componentes de interações
│   │   ├── interaction-form.tsx
│   │   ├── interaction-timeline.tsx  # Linha do tempo
│   │   └── interaction-item.tsx
│   │
│   └── shared/                       # Componentes genéricos reutilizáveis
│       ├── data-table.tsx            # Tabela genérica com busca/filtro/paginação
│       ├── empty-state.tsx           # Estado vazio com ilustração e CTA
│       ├── confirm-dialog.tsx        # Modal de confirmação genérico
│       ├── loading-spinner.tsx
│       ├── page-header.tsx           # Cabeçalho de página com título/ações
│       └── error-boundary.tsx        # Boundary de erro
│
├── lib/                              # 📚 Bibliotecas, clientes externos, utilitários
│   │
│   ├── supabase/                     # Cliente Supabase
│   │   ├── client.ts                 # Cliente browser (Client Components)
│   │   ├── server.ts                 # Cliente server (Server Components/Actions)
│   │   ├── middleware.ts             # Helper de middleware
│   │   └── admin.ts                  # Cliente admin (service_role) — uso restrito
│   │
│   ├── stripe/                       # Cliente e helpers do Stripe
│   │   ├── client.ts                 # Instância do Stripe SDK
│   │   ├── webhook.ts                # Validação e parse de webhook
│   │   └── payment-link.ts           # Geração de Payment Links
│   │
│   ├── apify/                        # Cliente e helpers do Apify
│   │   ├── client.ts                 # Instância do Apify SDK
│   │   ├── actors.ts                 # Mapa de atores disponíveis (Google Maps, LinkedIn, etc.)
│   │   └── parse-results.ts          # Parser dos resultados retornados
│   │
│   ├── anthropic/                    # Cliente da Anthropic API (IA)
│   │   ├── client.ts                 # Instância do SDK
│   │   ├── prompts.ts                # Prompts versionados (qualificação de leads)
│   │   └── enrich-lead.ts            # Função de enriquecimento de lead
│   │
│   ├── resend/                       # Cliente de e-mail
│   │   ├── client.ts
│   │   └── templates.ts              # Templates de e-mail (welcome, payment, etc.)
│   │
│   ├── validations/                  # Schemas Zod
│   │   ├── client.ts                 # createClientSchema, updateClientSchema
│   │   ├── contract.ts
│   │   ├── lead.ts
│   │   ├── interaction.ts
│   │   ├── payment.ts
│   │   └── apify-search.ts
│   │
│   ├── utils/                        # Utilitários puros (sem side effects)
│   │   ├── cn.ts                     # className utility (clsx + tailwind-merge)
│   │   ├── format.ts                 # formatCurrency, formatDate, formatPhone
│   │   ├── deduplicate.ts            # Detecção de duplicatas (RN11)
│   │   └── relative-date.ts          # "há 2 dias", "agora mesmo"
│   │
│   └── constants/                    # Constantes globais
│       ├── pipeline-stages.ts        # Os 5 estágios do Kanban
│       ├── service-types.ts          # Tipos de serviço (website, app, etc.)
│       ├── payment-methods.ts
│       └── limits.ts                 # MAX_LEADS_PER_SEARCH, MAX_FILE_SIZE, etc.
│
├── server/                           # 🔧 Server Actions (mutations)
│   ├── clients.ts                    # createClient, updateClient, deleteClient
│   ├── contracts.ts
│   ├── leads.ts                      # createLead, moveLead, convertLeadToClient
│   ├── interactions.ts
│   ├── apify.ts                      # startApifySearch, syncApifyResults
│   ├── payments.ts                   # createPaymentLink, registerManualPayment
│   └── auth.ts                       # signIn, signOut, resetPassword
│
├── types/                            # 📐 Tipos TypeScript globais
│   ├── database.ts                   # Tipos gerados pelo Supabase CLI (NÃO editar)
│   ├── client.ts                     # Type Client, ClientWithContracts, etc.
│   ├── contract.ts
│   ├── lead.ts
│   ├── interaction.ts
│   ├── payment.ts
│   ├── apify.ts
│   └── index.ts                      # Re-exports de tudo
│
├── hooks/                            # 🎣 Custom hooks React
│   ├── use-clients.ts                # Hook para fetch/cache de clientes
│   ├── use-leads.ts
│   ├── use-pipeline.ts               # Hook para o Kanban (drag-and-drop)
│   ├── use-toast.ts                  # Hook do shadcn/ui
│   └── use-debounce.ts
│
├── supabase/                         # 🗄️ Migrations e schema do Supabase
│   ├── migrations/                   # Migrations versionadas
│   │   └── 20260501000000_initial_schema.sql
│   ├── schema.sql                    # Cópia do SCHEMA.sql (referência)
│   └── seed.sql                      # Dados iniciais (se necessário)
│
├── public/                           # 🖼️ Assets estáticos
│   ├── logo.svg
│   ├── favicon.ico
│   ├── og-image.png                  # Imagem para Open Graph (compartilhamento)
│   └── illustrations/                # Ilustrações para empty states
│       ├── empty-clients.svg
│       ├── empty-leads.svg
│       └── empty-payments.svg
│
├── docs/                             # 📖 Documentação do projeto
│   ├── PRD.md                        # Visão de produto
│   ├── REQUISITOS.md                 # RFs e RNFs
│   ├── REGRAS.md                     # Regras de negócio, UI/UX, segurança
│   ├── ESTRUTURA.md                  # Este arquivo
│   ├── KICKOFF.md                    # Prompt para iniciar Claude Code
│   └── decisions/                    # ADRs (Architecture Decision Records)
│       └── 0001-stack-tecnologica.md  # Exemplo de ADR
│
├── .vscode/                          # ⚙️ Configurações do VS Code (opcional)
│   ├── settings.json                 # Format on save, ESLint, etc.
│   └── extensions.json               # Extensões recomendadas
│
├── .env.example                      # Template de variáveis de ambiente
├── .env.local                        # Variáveis reais (NÃO commitado)
├── .eslintrc.json                    # Configuração do ESLint
├── .gitignore                        # Arquivos ignorados pelo Git
├── .prettierrc                       # Configuração do Prettier
├── CLAUDE.md                         # Contexto principal para Claude Code
├── README.md                         # Apresentação do projeto
├── components.json                   # Config do shadcn/ui
├── middleware.ts                     # Middleware do Next.js (auth)
├── next.config.ts                    # Configuração do Next.js
├── package.json                      # Dependências e scripts
├── pnpm-lock.yaml                    # Lock file do pnpm
├── postcss.config.js                 # Configuração do PostCSS (Tailwind)
├── tailwind.config.ts                # Configuração do Tailwind CSS
└── tsconfig.json                     # Configuração do TypeScript
```

---

## 3. Convenções de Onde Colocar Arquivos

### 3.1 Quando criar um arquivo novo, pergunte-se:

**É uma página (rota acessível por URL)?**
- Sim → `app/(auth)/...` ou `app/(dashboard)/...`

**É um componente visual reutilizável?**
- Sim, e é específico de um módulo? → `components/[modulo]/`
- Sim, e é genérico? → `components/shared/`
- Sim, e veio do shadcn? → `components/ui/`

**É uma função que altera dados (mutation)?**
- Sim → `server/[modulo].ts` com `'use server'`

**É um cliente de serviço externo?**
- Sim → `lib/[servico]/client.ts`

**É uma função pura sem efeitos colaterais?**
- Sim → `lib/utils/`

**É um schema de validação Zod?**
- Sim → `lib/validations/[entidade].ts`

**É um tipo TypeScript reutilizável?**
- Sim → `types/[entidade].ts`

**É uma constante?**
- Sim → `lib/constants/[contexto].ts`

**É um custom hook React?**
- Sim → `hooks/use-[nome].ts`

---

## 4. Aliases de Import (Path Aliases)

Configurados em `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

**Exemplos de uso:**

```typescript
// ✅ Correto
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/server'
import { formatCurrency } from '@/lib/utils/format'
import type { Lead } from '@/types/lead'
import { createLeadSchema } from '@/lib/validations/lead'
import { PIPELINE_STAGES } from '@/lib/constants/pipeline-stages'

// ❌ Errado (caminhos relativos longos)
import { Button } from '../../../components/ui/button'
```

---

## 5. Arquivos Críticos — Não Mexer Sem Entender

| Arquivo | Cuidado |
|---------|---------|
| `middleware.ts` | Controla autenticação de **todas** as rotas. Mudanças podem expor rotas privadas. |
| `lib/supabase/admin.ts` | Usa `service_role_key`. **Nunca** importar em Client Components. |
| `app/api/webhooks/*/route.ts` | Webhooks de produção. Mudanças podem quebrar pagamentos e prospecção. |
| `supabase/migrations/*` | Migrations já aplicadas em produção **não podem ser editadas**, apenas adicionadas. |
| `types/database.ts` | Gerado pelo Supabase CLI. **Nunca** editar manualmente. |
| `components/ui/*` | Componentes shadcn — editar com cuidado para não quebrar consistência. |

---

## 6. Pastas Que Crescem com o Tempo

Estas pastas vão crescer conforme o projeto evolui — esteja preparado para criar subpastas quando passar de ~10 arquivos:

- `components/[modulo]/` — quando passar de 10 arquivos, criar subpastas (ex.: `components/clients/forms/`, `components/clients/lists/`)
- `server/` — pode virar `server/[modulo]/index.ts` se um módulo tiver muitas actions
- `lib/utils/` — manter cada utilitário em arquivo separado (não criar `utils.ts` gigante)

---

**Última atualização:** Maio 2026
**Versão:** 1.0 (MVP)
