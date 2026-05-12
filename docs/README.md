# Zavo

> Sistema interno de gestão comercial da **Zavo Tech** — empresa de tecnologia especializada em construção de websites, desenvolvimento de aplicativos e automação com inteligência artificial para pequenas e médias empresas.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org)
[![Supabase](https://img.shields.io/badge/Supabase-Postgres-3ECF8E?logo=supabase)](https://supabase.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwind-css)](https://tailwindcss.com)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?logo=stripe)](https://stripe.com)
[![License](https://img.shields.io/badge/license-Proprietary-red)]()

---

## 📋 Sobre o Projeto

**Zavo** centraliza toda a operação comercial da Zavo Tech em uma única plataforma:

- 👥 **CRM** — gestão de clientes, contratos e histórico de interações
- 🎯 **Pipeline de Leads** — funil Kanban com 5 estágios (Novo → Contato → Proposta → Fechado / Perdido)
- 🤖 **Prospecção Automática** — busca de leads via [Apify](https://apify.com) com qualificação por IA ([Anthropic Claude](https://anthropic.com))
- 💳 **Pagamentos** — Payment Links via [Stripe](https://stripe.com) e registro manual (Pix, transferência, dinheiro)
- 📊 **Dashboard** — métricas comerciais (leads/mês, taxa de conversão, MRR, receita)

> **Operação:** sistema acessado por **um único administrador** (admin único). Não há cadastro público no MVP.

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologia |
|--------|-----------|
| Framework | [Next.js 15](https://nextjs.org) (App Router) |
| Linguagem | [TypeScript](https://www.typescriptlang.org) |
| Estilização | [Tailwind CSS 4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com) |
| Banco de Dados | [Supabase](https://supabase.com) (PostgreSQL + Auth + RLS) |
| Validação | [Zod](https://zod.dev) + [React Hook Form](https://react-hook-form.com) |
| Drag-and-Drop | [dnd-kit](https://dndkit.com) |
| Pagamentos | [Stripe](https://stripe.com) |
| Prospecção | [Apify](https://apify.com) |
| IA | [Anthropic API](https://anthropic.com) (Claude Haiku 4.5) |
| E-mail | [Resend](https://resend.com) |
| Hospedagem | [Vercel](https://vercel.com) |
| Gerenciador de Pacotes | [pnpm](https://pnpm.io) |

---

## 🚀 Começando

### Pré-requisitos

- **Node.js** 20+
- **pnpm** 9+
- Contas ativas em: Supabase, Stripe, Apify, Anthropic, Resend, Vercel

### Instalação

```bash
# 1. Clonar o repositório
git clone <repo-url>
cd zavo

# 2. Instalar dependências
pnpm install

# 3. Configurar variáveis de ambiente
cp .env.example .env.local
# Edite .env.local com suas chaves reais

# 4. Aplicar schema no Supabase
# Acesse o SQL Editor do Supabase e execute supabase/schema.sql

# 5. Gerar tipos TypeScript do Supabase
pnpm supabase gen types typescript --project-id <project-id> > types/database.ts

# 6. Rodar em modo desenvolvimento
pnpm dev
```

A aplicação estará disponível em **http://localhost:3000**.

---

## 📁 Estrutura do Projeto

```
zavo/
├── app/                    # Rotas Next.js (App Router)
│   ├── (auth)/             # Login e recuperação de senha
│   ├── (dashboard)/        # Área logada (CRM, Leads, Pagamentos, etc.)
│   └── api/                # Webhooks (Stripe, Apify) e endpoints internos
├── components/             # Componentes React por módulo
├── lib/                    # Clientes externos, validações, utilitários
├── server/                 # Server Actions (mutations)
├── hooks/                  # Custom React hooks
├── types/                  # Tipos TypeScript globais
├── supabase/               # Migrations e schema SQL
├── public/                 # Assets estáticos
└── docs/                   # Documentação completa
```

📖 Estrutura detalhada em [`docs/ESTRUTURA.md`](./docs/ESTRUTURA.md).

---

## 📚 Documentação

A documentação completa está em [`docs/`](./docs):

- [`PRD.md`](./docs/PRD.md) — Documento de Requisitos do Produto
- [`REQUISITOS.md`](./docs/REQUISITOS.md) — Requisitos Funcionais e Não-Funcionais
- [`SCHEMA.sql`](./supabase/schema.sql) — Modelagem do banco de dados
- [`REGRAS.md`](./docs/REGRAS.md) — Regras de negócio, UI/UX e segurança
- [`ESTRUTURA.md`](./docs/ESTRUTURA.md) — Árvore de pastas comentada
- [`CLAUDE.md`](./CLAUDE.md) — Contexto para Claude Code (IA)
- [`KICKOFF.md`](./docs/KICKOFF.md) — Prompt de início para desenvolvimento

---

## 🧪 Scripts Disponíveis

```bash
pnpm dev          # Inicia servidor de desenvolvimento
pnpm build        # Build de produção
pnpm start        # Inicia servidor de produção (após build)
pnpm lint         # Verifica código com ESLint
pnpm typecheck    # Verifica tipos TypeScript
pnpm format       # Formata código com Prettier
```

---

## 🔐 Segurança

- Autenticação via **Supabase Auth** com sessões JWT
- **Row Level Security (RLS)** habilitado em todas as tabelas
- Webhooks (Stripe, Apify) validam **assinatura criptográfica**
- Variáveis sensíveis isoladas em `.env.local` (nunca commitadas)
- Validação dupla de inputs (Zod no cliente e no servidor)

📖 Detalhes em [`docs/REGRAS.md`](./docs/REGRAS.md) — seção 3.

---

## 🌍 Deploy

Deploy automático via **Vercel**:

- Push em `main` → deploy em produção
- Push em qualquer outra branch → preview deployment

**Domínio em produção:** [zavo.digital](https://zavo.digital)

### Variáveis de Ambiente em Produção

Configure no painel da Vercel todas as variáveis listadas em `.env.example`. Variáveis com prefixo `NEXT_PUBLIC_` são expostas no navegador (apenas chaves públicas).

---

## 🤝 Contribuição

Este é um projeto **proprietário** mantido por Irineu Fernandes (Zavo Tech).

### Padrão de Commits

Seguimos [Conventional Commits](https://www.conventionalcommits.org):

```
feat(leads): adiciona drag-and-drop no pipeline Kanban
fix(stripe): corrige validação de webhook signature
docs(readme): atualiza instruções de setup
```

### Workflow

1. Criar branch a partir de `main`: `feat/<nome-da-feature>`
2. Fazer commits pequenos e descritivos
3. Abrir Pull Request com descrição clara
4. Aguardar revisão e merge

---

## 📄 Licença

**Proprietário** — © 2026 Zavo Tech. Todos os direitos reservados.

Este código é privado e seu uso, cópia, modificação ou distribuição **não é permitido** sem autorização expressa.

---

## 📞 Contato

- **Empresa:** Zavo Tech
- **Site:** [zavo.digital](https://zavo.digital)
- **Responsável:** Irineu Fernandes
