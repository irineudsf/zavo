# KICKOFF — Prompt de Início para Claude Code

> **Este é o prompt que você (Irineu) vai colar no Claude Code para iniciar o desenvolvimento do projeto Zavo.**
> Copie tudo a partir da linha "INÍCIO DO PROMPT" até "FIM DO PROMPT" e cole no terminal do Claude Code.

---

## Instruções de Uso

1. Abra o terminal na pasta do projeto Zavo (que você já criou na Vercel).
2. Inicie o Claude Code: `claude`
3. Cole o prompt abaixo (entre "INÍCIO" e "FIM") como sua **primeira mensagem**.
4. Aguarde o Claude Code ler todos os documentos de contexto antes de começar a codar.

---

## ============================================================================
## INÍCIO DO PROMPT
## ============================================================================

Você é o desenvolvedor responsável por implementar o projeto **Zavo** — sistema interno de gestão comercial da Zavo Tech.

### 📚 LEITURA OBRIGATÓRIA — ANTES DE QUALQUER LINHA DE CÓDIGO

Antes de tocar em qualquer arquivo de código, leia **na ordem** os seguintes documentos. Eles estão na pasta `docs/` ou na raiz do projeto:

1. **`CLAUDE.md`** — stack, convenções de código, estrutura de pastas, padrões críticos, restrições. **ESTE É O ARQUIVO MAIS IMPORTANTE.**
2. **`PRD.md`** — visão de produto, personas, user stories, KPIs, fora de escopo.
3. **`REQUISITOS.md`** — 26 requisitos funcionais (RF) e 20 não-funcionais (RNF).
4. **`SCHEMA.sql`** — modelagem completa do banco de dados Supabase com RLS.
5. **`REGRAS.md`** — regras de negócio, UI/UX e segurança.
6. **`ESTRUTURA.md`** — árvore de pastas comentada.

⚠️ **NÃO PULE A LEITURA.** O contexto está completo nesses arquivos. Qualquer dúvida sua deve ser respondida primeiro consultando esses documentos.

---

### 🎯 SUA PRIMEIRA TAREFA — SETUP INICIAL DO PROJETO

Após ler todos os documentos, execute o **setup inicial** na seguinte ordem:

#### Etapa 1 — Verificação do Ambiente
1. Verifique se o projeto Next.js já está iniciado (procure `package.json`, `next.config.ts`).
2. Se **não estiver**, inicie com: `pnpm create next-app@latest . --typescript --tailwind --app --eslint --src-dir=false --import-alias="@/*"`
3. Confirme se as dependências mínimas estão instaladas. Se não, instale:
   ```bash
   pnpm add @supabase/supabase-js @supabase/ssr zod react-hook-form @hookform/resolvers
   pnpm add stripe @anthropic-ai/sdk apify-client resend
   pnpm add @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
   pnpm add lucide-react class-variance-authority clsx tailwind-merge
   pnpm add date-fns
   pnpm add -D @types/node prettier
   ```

#### Etapa 2 — Configuração de Ferramentas
1. Crie `.env.example` com **todas** as variáveis listadas no `CLAUDE.md` (seção 5).
2. Configure `.gitignore` (incluir `.env.local`, `.next/`, `node_modules/`, `*.log`).
3. Configure ESLint e Prettier conforme convenções do `CLAUDE.md`.
4. Configure shadcn/ui: `pnpm dlx shadcn@latest init`.

#### Etapa 3 — Estrutura de Pastas
Crie a estrutura completa descrita em `ESTRUTURA.md`:
- `app/(auth)/`, `app/(dashboard)/`, `app/api/`
- `components/ui/`, `components/layout/`, `components/clients/`, `components/leads/`, `components/pipeline/`, `components/payments/`, `components/shared/`
- `lib/supabase/`, `lib/stripe/`, `lib/apify/`, `lib/anthropic/`, `lib/resend/`, `lib/validations/`, `lib/utils/`
- `server/`
- `types/`
- `supabase/migrations/`
- `docs/decisions/` (para futuros ADRs)

Coloque um arquivo `.gitkeep` em pastas vazias.

#### Etapa 4 — Cliente Supabase Base
1. Crie `lib/supabase/client.ts` (cliente browser).
2. Crie `lib/supabase/server.ts` (cliente server, com cookies).
3. Crie `lib/supabase/middleware.ts` (helper de middleware).
4. Crie `middleware.ts` na raiz para proteger rotas conforme `REGRAS.md` (SEC06).

#### Etapa 5 — Layout Base e Tema
1. Configure `app/layout.tsx` com fonte Inter ou Geist Sans (via `next/font`).
2. Configure paleta de cores no `tailwind.config.ts` (use os valores sugeridos em REGRAS.md UX09 — paleta final será definida depois).
3. Crie um layout simples para `app/(auth)/layout.tsx` e `app/(dashboard)/layout.tsx`.

#### Etapa 6 — Aplicação do Schema
1. Confirme com o usuário (Irineu) se o schema `SCHEMA.sql` já foi aplicado no Supabase Dashboard.
2. Se ainda não foi, copie `SCHEMA.sql` para `supabase/schema.sql` e oriente a aplicação manual via SQL Editor do Supabase.
3. Após aplicado, gere os tipos TypeScript:
   ```bash
   pnpm supabase gen types typescript --project-id <ID> > types/database.ts
   ```

#### Etapa 7 — Tela de Login (US01)
Implemente a primeira funcionalidade ponta-a-ponta para validar o setup:
- Rota: `app/(auth)/login/page.tsx`
- Form com e-mail e senha (React Hook Form + Zod)
- Integração com Supabase Auth (`signInWithPassword`)
- Redirecionamento para `/dashboard` em sucesso
- Toast de erro em falha

---

### ✅ DEFINITION OF DONE DA PRIMEIRA TAREFA (Setup)

A primeira tarefa está concluída quando:

1. ✅ Todos os documentos foram lidos e compreendidos
2. ✅ Estrutura de pastas criada conforme `ESTRUTURA.md`
3. ✅ Dependências instaladas e funcionando
4. ✅ shadcn/ui configurado
5. ✅ ESLint e Prettier configurados e rodando sem erros
6. ✅ Schema do Supabase aplicado e tipos gerados
7. ✅ Cliente Supabase (browser e server) configurado
8. ✅ Middleware de autenticação funcionando
9. ✅ Tela de login funcionando com Supabase Auth (login real testado)
10. ✅ `pnpm dev` roda sem erros e a aplicação abre em `http://localhost:3000`
11. ✅ `.env.example` documentado com todas as variáveis
12. ✅ Commit inicial seguindo Conventional Commits (`feat: setup inicial do projeto Zavo`)

---

### 🛠️ COMO TRABALHAR DAQUI EM DIANTE

Após concluir o setup inicial, **pergunte ao usuário (Irineu) qual módulo implementar a seguir**. Ordem **sugerida** (mas não obrigatória):

1. **Módulo CRM (Clientes)** — RF05 a RF08 — base mais simples, valida o padrão de CRUD
2. **Módulo Contratos** — RF09 a RF10 — depende de Clientes
3. **Módulo Leads + Pipeline Kanban** — RF12 a RF15 — funcionalidade visual mais complexa
4. **Módulo Prospecção (Apify + IA)** — RF16 a RF19 — depende de Leads
5. **Módulo Pagamentos** — RF20 a RF23 — depende de Contratos
6. **Módulo Dashboard** — RF24 a RF26 — depende de todos os anteriores
7. **Polimento e Acessibilidade** — RNF13, RNF18

---

### 📐 REGRAS INEGOCIÁVEIS DURANTE TODO O DESENVOLVIMENTO

Estas regras vêm do `CLAUDE.md` e do `REGRAS.md`. **Nunca** as viole sem aprovação explícita do Irineu:

🚫 Nunca usar `any` em TypeScript
🚫 Nunca desabilitar RLS no Supabase
🚫 Nunca commitar `.env.local`
🚫 Nunca chamar Anthropic, Apify ou Stripe direto do client-side
🚫 Nunca fazer hard-delete em tabelas com `deleted_at`
🚫 Nunca usar `console.log` em código de produção
🚫 Nunca expor `SUPABASE_SERVICE_ROLE_KEY` no cliente
🚫 Nunca processar webhook sem validar assinatura
🚫 Nunca pular validação Zod no servidor (frontend não é confiável)

✅ Sempre comentar em português brasileiro
✅ Sempre usar Server Actions para mutations
✅ Sempre validar dados com Zod (cliente E servidor)
✅ Sempre seguir Conventional Commits
✅ Sempre testar manualmente antes de fazer commit
✅ Sempre cachear resultados de IA no banco
✅ Sempre exibir feedback visual (loading, toast) em ações do usuário

---

### 🤝 COMUNICAÇÃO COM O USUÁRIO

- Comunique-se em **português brasileiro** com Irineu.
- Quando usar termos técnicos em inglês, traduza ao lado entre parênteses na primeira menção (ex.: "endpoint (ponto de acesso da API)").
- **Pergunte antes de tomar decisões fora do escopo documentado.** Se algo não está claro, releia os docs primeiro. Se ainda não estiver, **pergunte ao Irineu**, não invente.
- Ao concluir cada etapa significativa, **resuma o que foi feito** e **pergunte se pode prosseguir**.
- Mostre o progresso em forma de checklist quando houver múltiplas etapas.

---

### 🚀 COMEÇAR

Sua primeira ação agora é **ler `CLAUDE.md`** e os outros documentos listados acima. Não execute nenhum comando até ter lido tudo.

Após a leitura, faça um **resumo executivo de 5-8 linhas** do que entendeu sobre o projeto e pergunte ao Irineu se pode iniciar a Etapa 1 do setup.

## ============================================================================
## FIM DO PROMPT
## ============================================================================

---

## Notas Adicionais para Irineu

- **Antes de colar este prompt**, certifique-se de que os arquivos `CLAUDE.md`, `PRD.md`, `REQUISITOS.md`, `SCHEMA.sql`, `REGRAS.md` e `ESTRUTURA.md` já estão na pasta do projeto (raiz ou `docs/`).
- **Se o Claude Code "esquecer" o contexto** durante o desenvolvimento, basta pedir: *"Releia o `CLAUDE.md` e o `REGRAS.md` antes de continuar."*
- **Se quiser pausar e retomar** depois, ao retornar diga: *"Estamos no projeto Zavo. Releia `CLAUDE.md` e me diga em qual etapa estávamos."*
- **Para mudar o escopo** durante o desenvolvimento, atualize o `PRD.md` e o `REQUISITOS.md` primeiro, depois peça ao Claude Code para revisar.
