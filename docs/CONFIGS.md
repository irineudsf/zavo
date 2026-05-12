# CONFIGS — Arquivos de Configuração Sugeridos

> Este documento lista **todos os arquivos de configuração** que devem existir na raiz do projeto Zavo, com o conteúdo recomendado de cada um.
> O Claude Code (ou desenvolvedor) deve criar/atualizar esses arquivos durante a Etapa 2 do `KICKOFF.md` (Configuração de Ferramentas).

---

## 1. `.env.example`

Template de variáveis de ambiente. **Commitado no repositório**. Serve como referência para qualquer dev que clonar o projeto.

```bash
# ============================================================================
# SUPABASE
# ============================================================================
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# ============================================================================
# STRIPE
# ============================================================================
STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your-publishable-key

# ============================================================================
# APIFY
# ============================================================================
APIFY_API_TOKEN=apify_api_your-token-here
APIFY_WEBHOOK_SECRET=your-custom-webhook-secret

# ============================================================================
# ANTHROPIC (IA)
# ============================================================================
ANTHROPIC_API_KEY=sk-ant-your-key-here

# ============================================================================
# RESEND (E-MAIL)
# ============================================================================
RESEND_API_KEY=re_your-resend-key

# ============================================================================
# APP
# ============================================================================
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> ⚠️ **NUNCA** preencha este arquivo com valores reais.
> O arquivo `.env.local` (que recebe os valores reais) está no `.gitignore`.

---

## 2. `.gitignore`

```gitignore
# Dependências
node_modules/
.pnp
.pnp.js
.yarn/install-state.gz

# Build do Next.js
.next/
out/
build/
dist/

# Variáveis de ambiente
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Sistema operacional
.DS_Store
Thumbs.db

# Editor
.vscode/*
!.vscode/settings.json
!.vscode/extensions.json
.idea/

# Cobertura de testes
coverage/

# Tipos do Supabase (regenerados via CLI)
# Manter comentado para versionar tipos
# types/database.ts

# Vercel
.vercel/

# TypeScript build info
*.tsbuildinfo
next-env.d.ts

# Arquivos temporários
*.tmp
*.swp
*.swo
```

---

## 3. `package.json` (Dependências Mínimas)

```json
{
  "name": "zavo",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  },
  "dependencies": {
    "@anthropic-ai/sdk": "^0.32.0",
    "@dnd-kit/core": "^6.1.0",
    "@dnd-kit/sortable": "^8.0.0",
    "@dnd-kit/utilities": "^3.2.2",
    "@hookform/resolvers": "^3.9.0",
    "@supabase/ssr": "^0.5.0",
    "@supabase/supabase-js": "^2.45.0",
    "apify-client": "^2.10.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.1",
    "date-fns": "^4.1.0",
    "lucide-react": "^0.454.0",
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-hook-form": "^7.53.0",
    "resend": "^4.0.0",
    "stripe": "^17.0.0",
    "tailwind-merge": "^2.5.0",
    "zod": "^3.23.0"
  },
  "devDependencies": {
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "autoprefixer": "^10.4.0",
    "eslint": "^9.0.0",
    "eslint-config-next": "^15.0.0",
    "postcss": "^8.4.0",
    "prettier": "^3.3.0",
    "prettier-plugin-tailwindcss": "^0.6.0",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.6.0"
  },
  "packageManager": "pnpm@9.0.0",
  "engines": {
    "node": ">=20.0.0"
  }
}
```

> ⚠️ As versões acima são **referência**. O Claude Code deve usar as versões **mais recentes estáveis** ao instalar com `pnpm add`.

---

## 4. `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts"
  ],
  "exclude": ["node_modules"]
}
```

---

## 5. `tailwind.config.ts`

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Paleta a definir conforme identidade visual de zavo.digital
        // Valores abaixo são placeholders iniciais
        primary: {
          DEFAULT: '#2563EB',
          foreground: '#FFFFFF',
        },
        success: {
          DEFAULT: '#16A34A',
          foreground: '#FFFFFF',
        },
        warning: {
          DEFAULT: '#EAB308',
          foreground: '#000000',
        },
        danger: {
          DEFAULT: '#DC2626',
          foreground: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
```

> ⚠️ Após decisão D01 (paleta de cores final em `REGRAS.md`), substituir valores acima.

---

## 6. `.eslintrc.json`

```json
{
  "extends": [
    "next/core-web-vitals",
    "next/typescript"
  ],
  "rules": {
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_"
      }
    ],
    "no-console": ["warn", { "allow": ["warn", "error"] }],
    "prefer-const": "error",
    "no-var": "error"
  }
}
```

---

## 7. `.prettierrc`

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "arrowParens": "always",
  "endOfLine": "lf",
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

---

## 8. `.prettierignore`

```
node_modules
.next
build
dist
out
public
*.lock
pnpm-lock.yaml
```

---

## 9. `next.config.ts`

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  images: {
    remotePatterns: [
      // Adicionar domínios externos quando necessário
      // Exemplo: imagens de leads vindas do Apify
    ],
  },

  // Headers de segurança
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ]
  },
}

export default nextConfig
```

---

## 10. `postcss.config.js`

```javascript
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

> Para Tailwind 4. Se usar Tailwind 3, substituir por:
> ```javascript
> module.exports = { plugins: { tailwindcss: {}, autoprefixer: {} } }
> ```

---

## 11. `components.json` (shadcn/ui)

Será gerado automaticamente ao rodar `pnpm dlx shadcn@latest init`.

Configuração recomendada durante o init:
- **Style:** New York
- **Base color:** Slate (ou Zinc)
- **CSS variables:** Yes
- **Tailwind config:** `tailwind.config.ts`
- **Components alias:** `@/components`
- **Utils alias:** `@/lib/utils/cn`

---

## 12. `.vscode/settings.json` (Opcional, mas recomendado)

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cn\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

---

## 13. `.vscode/extensions.json` (Opcional)

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "supabase.supabase-vscode",
    "stripe.vscode-stripe"
  ]
}
```

---

## 14. `middleware.ts` (Raiz do Projeto)

```typescript
// Middleware de autenticação — protege todas as rotas exceto as públicas
// Implementação detalhada deve seguir CLAUDE.md seção 6.1 e REGRAS.md SEC06

import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     * - api/webhooks (validados por assinatura, não por sessão)
     */
    '/((?!_next/static|_next/image|favicon.ico|api/webhooks|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
```

---

## ✅ Checklist de Configuração

Use esta lista para garantir que todos os arquivos foram criados:

- [ ] `.env.example` — template de variáveis
- [ ] `.env.local` — valores reais (NÃO commitado)
- [ ] `.gitignore` — arquivos ignorados
- [ ] `package.json` — dependências
- [ ] `tsconfig.json` — TypeScript
- [ ] `tailwind.config.ts` — Tailwind CSS
- [ ] `.eslintrc.json` — ESLint
- [ ] `.prettierrc` — Prettier
- [ ] `.prettierignore` — arquivos ignorados pelo Prettier
- [ ] `next.config.ts` — Next.js
- [ ] `postcss.config.js` — PostCSS
- [ ] `components.json` — shadcn/ui (gerado pelo init)
- [ ] `.vscode/settings.json` — VS Code (opcional)
- [ ] `.vscode/extensions.json` — extensões VS Code (opcional)
- [ ] `middleware.ts` — middleware de auth

---

**Última atualização:** Maio 2026
**Versão:** 1.0 (MVP)
