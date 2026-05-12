# Configuração Vercel + Supabase + Integrações
## Zavo Internal SaaS

---

## 1. Variáveis de Ambiente (Vercel)

Adicione no **Vercel → Project Settings → Environment Variables**.
Marque cada uma como `Production`, `Preview` e `Development` conforme necessário.

### 🔴 OBRIGATÓRIAS (sem isso, app quebra)

| Nome | Onde obter | Ambientes |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Project Settings → API → Project URL | Todos |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Project Settings → API → anon public | Todos |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Project Settings → API → service_role | **APENAS** Production e Preview |
| `ANTHROPIC_API_KEY` | console.anthropic.com → API Keys | Todos |
| `RESEND_API_KEY` | resend.com → API Keys | Todos |
| `NEXT_PUBLIC_APP_URL` | URL do app (ex: `https://zavo.app`) | Por ambiente |

### 🟡 RECOMENDADAS (pra prospecção autônoma funcionar)

| Nome | Onde obter |
|---|---|
| `VOYAGE_API_KEY` | dash.voyageai.com |
| `APIFY_TOKEN` | console.apify.com → Settings → Integrations |
| `ZAPI_INSTANCE_ID` | painel.z-api.io |
| `ZAPI_TOKEN` | painel.z-api.io |
| `GOOGLE_CLIENT_ID` | console.cloud.google.com → OAuth 2.0 |
| `GOOGLE_CLIENT_SECRET` | idem |
| `RESEND_WEBHOOK_SECRET` | resend.com → Webhooks → Signing Secret |
| `N8N_WEBHOOK_SECRET` | gere com `openssl rand -hex 32` |

### 🟢 OPCIONAIS (observabilidade)

| Nome | Onde obter |
|---|---|
| `SENTRY_DSN` | sentry.io → Settings → DSN |
| `SENTRY_AUTH_TOKEN` | sentry.io → Auth Tokens |
| `NEXT_PUBLIC_POSTHOG_KEY` | posthog.com → Project API Key |
| `NEXT_PUBLIC_POSTHOG_HOST` | `https://us.i.posthog.com` |

---

## 2. Configuração de Domínios

### No Vercel
1. **Settings → Domains** → adicionar `zavo.app` (ou domínio escolhido).
2. Configurar DNS no registrador:
   - `A` → `76.76.21.21`
   - `CNAME` `www` → `cname.vercel-dns.com`

### Subdomínios sugeridos
- `app.zavo.app` → produção
- `staging.zavo.app` → preview/staging
- `n8n.zavo.app` → n8n self-hosted (se for o caso)

---

## 3. Configuração de E-mail (Resend)

Pra prospecção funcionar sem cair em spam:

### 3.1 DNS (no registrador do domínio de envio)

Use um domínio dedicado pra prospecção, **não use seu domínio principal**.
Sugestão: `mail.zavo.app` ou `zavo-outreach.com`.

**Adicione estes 4 registros:**

```
Tipo    Nome                 Valor
TXT     @                    "v=spf1 include:amazonses.com ~all"
TXT     resend._domainkey    [valor fornecido pelo Resend]
TXT     _dmarc               "v=DMARC1; p=quarantine; rua=mailto:dmarc@zavo.app"
MX      send                 feedback-smtp.us-east-1.amazonses.com (priority 10)
```

### 3.2 Warmup (aquecimento de domínio)

Antes de mandar pra 100+ prospects:
- **Dia 1–3:** envie 5–10 e-mails/dia (modo sombra, aprove cada um).
- **Dia 4–7:** suba pra 20–30/dia.
- **Dia 8–14:** suba pra 50–80/dia.
- **Após 14 dias:** modo autônomo liberado, máximo 200/dia.

**Use ferramentas tipo Mailwarm ou WarmupInbox** se quiser acelerar.

### 3.3 Webhook do Resend

1. Resend → Webhooks → Add Endpoint.
2. URL: `https://zavo.app/api/webhooks/resend`
3. Eventos: `email.sent`, `email.delivered`, `email.opened`, `email.clicked`, `email.bounced`, `email.complained`.
4. Copie o Signing Secret pra `RESEND_WEBHOOK_SECRET`.

---

## 4. Configuração Supabase

### 4.1 Rodar o schema

1. Abra Supabase → SQL Editor → New Query.
2. Cole TODO o conteúdo de `02-schema-supabase.sql`.
3. Run.

### 4.2 Auth (Google OAuth)

1. Authentication → Providers → Google → Enable.
2. Cole `Client ID` e `Client Secret` do Google Cloud.
3. Authorized redirect URLs no Google: `https://[seu-projeto].supabase.co/auth/v1/callback`.
4. Site URL no Supabase: `https://zavo.app`.
5. Redirect URLs adicionais: `https://zavo.app/auth/callback`, `http://localhost:3000/auth/callback`.

### 4.3 Storage

```sql
-- Bucket de contratos (privado)
insert into storage.buckets (id, name, public)
values ('contracts', 'contracts', false);

-- Política: só owner acessa seus contratos
create policy "owner_contracts_access"
on storage.objects for all
using (
  bucket_id = 'contracts'
  and auth.uid()::text = (storage.foldername(name))[1]
);
```

Estrutura de pastas: `contracts/{user_id}/{contract_id}.pdf`

### 4.4 Edge Functions (opcional na fase MVP)

Crie quando precisar:
- `purge-expired` (LGPD): roda diário, chama `purge_expired_prospects()`.
- `process-embedding`: gera embedding via Voyage e atualiza prospect.

### 4.5 Vault (segredos do banco)

```sql
-- Guardar API keys que o n8n vai usar
select vault.create_secret('apify_token_production', 'apify_token_value_aqui');
```

---

## 5. n8n — Workflows Iniciais

Crie 4 workflows na sua instância n8n:

### Workflow 1: `apify-import-daily`
- **Trigger:** Cron (todo dia 7am).
- **Steps:**
  1. Apify Actor (LinkedIn ou Google Maps scraper).
  2. Format → array de prospects.
  3. HTTP Request → `POST https://zavo.app/api/n8n/import-prospects` com header `x-n8n-secret: {{ N8N_WEBHOOK_SECRET }}`.

### Workflow 2: `qualify-new-prospects`
- **Trigger:** Cron (a cada 30min).
- **Steps:**
  1. Supabase Query: `SELECT * FROM prospects WHERE status='new' LIMIT 10`.
  2. HTTP Request → `POST https://zavo.app/api/ai/qualify-batch`.

### Workflow 3: `generate-emails`
- **Trigger:** Cron (a cada 30min).
- **Steps:**
  1. Supabase Query: prospects qualified sem mensagem outbound.
  2. HTTP Request → `POST /api/ai/generate-email-batch`.

### Workflow 4: `send-approved-messages`
- **Trigger:** Cron (a cada 15min).
- **Steps:**
  1. Supabase Query: messages `approved` com `scheduled_for <= now`.
  2. HTTP Request → `POST /api/n8n/send-batch`.

---

## 6. Limites e Rate Limiting

### Vercel Edge Config
Crie em **Vercel → Storage → Edge Config**:

```json
{
  "rate_limits": {
    "ai_qualify": { "max": 100, "window_minutes": 1 },
    "ai_generate": { "max": 50, "window_minutes": 1 },
    "send_email": { "max": 200, "window_minutes": 60 }
  },
  "feature_flags": {
    "autonomous_mode": false,
    "whatsapp_enabled": false,
    "linkedin_enabled": false
  }
}
```

Toggle `autonomous_mode` pra `true` após 14 dias de calibração.

### Limites de API
- **Anthropic Tier 1:** 50 req/min, 50k input tokens/min — provavelmente suficiente.
- **Resend Free:** 100 e-mails/dia, 3.000/mês. Vá pra Pro ($20) cedo.
- **Supabase Free:** 500MB DB, 1GB storage, 50k MAU. Pro ($25) recomendado.

---

## 7. Checklist de Go-Live

Antes de mandar pro mundo:

- [ ] Schema rodado no Supabase
- [ ] RLS verificado em TODAS as tabelas (`select * from pg_policies`)
- [ ] Auth Google funcionando em produção
- [ ] Domínio de e-mail com SPF/DKIM/DMARC verde no Resend
- [ ] Endpoint `/api/unsubscribe` testado com clique real
- [ ] Webhook do Resend testado (e-mail aberto reflete no DB)
- [ ] Sentry capturando erros de teste
- [ ] PostHog rastreando pelo menos 1 evento
- [ ] Variáveis de ambiente configuradas em Production
- [ ] Backup automático do Supabase ativado (Pro plan)
- [ ] First Campaign criada em modo sombra
- [ ] 50 prospects de teste importados
- [ ] 5 e-mails reais enviados pra e-mails seus, todos rastreados
- [ ] Política de privacidade publicada em `/privacy` (LGPD exige)
- [ ] Termos de uso em `/terms`
- [ ] DPO (Data Protection Officer) designado — nesse caso, você mesmo

---

## 8. Política de Privacidade — Modelo Mínimo (LGPD)

Salve em `/app/privacy/page.tsx`:

```markdown
# Política de Privacidade — Zavo

**Última atualização:** [data]

## 1. Quem somos
Zavo, operada por Irineu Fernandes, CNPJ [se houver].
Contato DPO: privacy@zavo.app

## 2. Dados que coletamos
- De clientes ativos: nome, e-mail, telefone, CNPJ, dados de contrato.
- De prospects (potenciais clientes): nome, e-mail profissional, cargo, empresa,
  obtidos de fontes públicas (LinkedIn, sites corporativos) sob a base legal
  de "legítimo interesse" para abordagem comercial B2B.

## 3. Como usamos
- Gestão da relação comercial (clientes ativos).
- Abordagem inicial via e-mail (prospects).

## 4. Seus direitos (LGPD Art. 18)
Você pode, a qualquer momento:
- Solicitar acesso aos seus dados
- Solicitar correção
- Solicitar exclusão
- Solicitar portabilidade
- Opor-se ao tratamento
- Descadastrar-se de comunicações: [link]

## 5. Retenção
Dados de prospects que não viraram clientes são excluídos após 18 meses.
Dados de clientes são mantidos durante a relação comercial + 5 anos.

## 6. Compartilhamento
Não compartilhamos dados com terceiros, exceto operadores que nos prestam
serviços (Supabase/AWS, Resend, Anthropic) sob acordos de processamento de dados.

## 7. Contato
Para exercer qualquer direito: privacy@zavo.app
ANPD: anpd.gov.br
```

---

## 9. Custos Mensais Reais (Atualizado)

| Serviço | Plano | $/mês |
|---|---|---|
| Supabase | Pro | $25 |
| Vercel | Pro | $20 |
| Anthropic Claude | pay-as-you-go | $30–150 |
| Voyage AI | pay-as-you-go | $5–15 |
| Resend | Pro | $20 |
| Apify | Personal | $49 |
| Z-API (WhatsApp) | Standard | $30 |
| Sentry | Team | $26 |
| PostHog | Free → Growth | $0–50 |
| Domínio (.app) | anual | ~$2/mês |
| **TOTAL** | | **~$210–390/mês** |

ROI: 1 cliente Zavo de $2k paga 5–10 meses de stack.
