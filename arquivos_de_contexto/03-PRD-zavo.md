# PRD — Zavo Internal SaaS
**Product Requirements Document (Documento de Requisitos do Produto)**

**Projeto:** Zavo Internal — ERP + Prospecção Autônoma
**Owner:** Irineu Fernandes
**Prazo MVP:** 21 dias
**Modelo de priorização:** MoSCoW (Must, Should, Could, Won't)

---

## 1. Visão de Produto

> "Um sistema operacional pessoal pra rodar a Zavo como uma empresa de uma pessoa só, onde a IA é a força de trabalho que prospecta, qualifica, aborda e agenda — enquanto eu fecho contratos."

**Métrica norte:** reuniões qualificadas agendadas por semana sem intervenção manual de prospecção.

---

## 2. Personas

**Única persona: Irineu (owner-operator)**
- Gestor + comercial + executor.
- Brasileiro, mora nos EUA, opera em PT-BR e EN.
- Domina n8n, Claude, criação de conteúdo, marketing.
- Não é dev sênior — vai construir com Claude Code.
- Tempo escasso: prefere clicar 1 vez do que clicar 5.

---

## 3. Módulos do Sistema

```
┌────────────────────────────────────────────────────┐
│                    ZAVO INTERNAL                   │
├────────────────────────────────────────────────────┤
│  📊 Dashboard    │  Visão geral, métricas, alertas │
│  👥 Clientes     │  CRM dos clientes ativos        │
│  🎯 Prospects    │  Pipeline de leads              │
│  🚀 Campanhas    │  Configuração de prospecção     │
│  💬 Inbox        │  Conversas centralizadas        │
│  📅 Agenda       │  Reuniões + Google Calendar     │
│  📄 Contratos    │  Geração + assinatura           │
│  🤖 Agentes      │  Configuração de IA             │
│  ⚙️  Ajustes     │  Integrações, prompts, billing  │
└────────────────────────────────────────────────────┘
```

---

## 4. Requisitos Priorizados (MoSCoW)

### 🔴 MUST HAVE (MVP — 21 dias)
*Sem isto, o sistema não cumpre o propósito.*

| # | Requisito | Estimativa |
|---|---|---|
| M1 | Auth com Google OAuth (Supabase Auth) | 0,5 dia |
| M2 | CRUD de Clientes (cadastro, edição, listagem, busca) | 1,5 dia |
| M3 | CRUD de Prospects + import via CSV | 1 dia |
| M4 | Configuração de Campanha (ICP, prompts, canais) | 1,5 dia |
| M5 | Integração com Apify (workflow n8n: scrape → insert) | 2 dias |
| M6 | Qualificação de prospect via Claude (n8n workflow) | 1,5 dia |
| M7 | Geração de e-mail personalizado via Claude (streaming) | 1,5 dia |
| M8 | Fila de aprovação (modo sombra 14 dias) | 1 dia |
| M9 | Envio de e-mail via Resend + tracking de abertura | 1,5 dia |
| M10 | Endpoint público de unsubscribe (LGPD) | 0,5 dia |
| M11 | Pipeline visual de prospects (Kanban) | 1 dia |
| M12 | Dashboard com métricas básicas (sent, opened, replied, meetings) | 1 dia |
| M13 | Integração Google Calendar (criar reunião) | 1 dia |
| M14 | Webhook de resposta de e-mail (Resend → Supabase) | 1 dia |
| M15 | Classificação automática de respostas (Haiku 4.5) | 1 dia |
| M16 | Logs estruturados + Sentry | 0,5 dia |
| M17 | RLS testado em todas as tabelas | 0,5 dia |
| M18 | Deploy Vercel + variáveis de ambiente | 0,5 dia |

**Total estimado MVP:** 19,5 dias úteis (com folga de 1,5 dia pra imprevistos = 21 dias).

---

### 🟡 SHOULD HAVE (V1 — 30–60 dias)
*Importante, mas não impede o lançamento.*

| # | Requisito |
|---|---|
| S1 | Integração WhatsApp via Z-API ou Evolution API |
| S2 | Cadência multicanal (e-mail dia 0 → WhatsApp dia 3 → LinkedIn dia 7) |
| S3 | Geração de contratos com templates + assinatura via Dropbox Sign / Autentique |
| S4 | Inbox unificado (e-mail + WhatsApp em uma única tela) |
| S5 | Busca semântica de prospects similares (pgvector) |
| S6 | Automação de follow-up baseada em comportamento (abriu mas não respondeu) |
| S7 | Modo autônomo total liberado (após 14 dias de calibração) |
| S8 | Transcrição de reunião + resumo + action items (Whisper + Claude) |
| S9 | Painel de custos da IA (tokens consumidos por dia/operação) |
| S10 | Feature flags via PostHog |
| S11 | Notificações push via PWA |

---

### 🟢 COULD HAVE (V2 — 90–180 dias)
*Bom ter, mas só depois de validar o core.*

| # | Requisito |
|---|---|
| C1 | App mobile (PWA → React Native via Expo) |
| C2 | Voice agent — IA atende ligações via ElevenLabs + Twilio |
| C3 | Geração automática de propostas comerciais em PDF |
| C4 | Integração com Stripe pra cobrança de clientes |
| C5 | Dashboard financeiro (receitas, despesas, MRR) |
| C6 | Sistema de tags/labels com IA classificando prospects |
| C7 | Multi-conta de e-mail (rotacionar pra evitar spam) |
| C8 | A/B testing de prompts e templates |
| C9 | Integração com LinkedIn Sales Navigator |
| C10 | API pública (caso decida abrir o produto) |

---

### ⚫ WON'T HAVE (não nesta versão)
*Explicitamente fora de escopo agora.*

| # | Requisito | Motivo |
|---|---|---|
| W1 | Multi-tenant comercial / planos pagos | Não é o objetivo agora |
| W2 | Microsserviços / Kubernetes | Complexidade desnecessária |
| W3 | App nativo iOS/Android | PWA resolve |
| W4 | Suporte a múltiplos idiomas na UI | Você fala PT-BR e EN, ambos cabem |
| W5 | BI/Analytics avançado (Looker/Metabase) | PostHog + dashboard próprio bastam |
| W6 | Marketplace de templates | Premature optimization |
| W7 | White-label | Você é o único usuário |

---

## 5. Fluxos Críticos

### 5.1 Fluxo de Prospecção Autônoma (happy path)

```
1. Irineu cria Campanha:
   - Define ICP (ex: "Donos de e-commerce no Brasil, faturamento $50k-500k/mês")
   - Configura cadência: dia0 email, dia3 whatsapp, dia7 linkedin
   - Sobe prompt de qualificação + prompt de abordagem

2. n8n (cron diário 7am):
   - Roda Apify Actor → traz 50 leads novos
   - Insere em prospects (status='new')

3. n8n (a cada 30min):
   - Pega 10 prospects status='new'
   - Chama Claude pra qualificar (score 0-100)
   - Atualiza prospects (status='qualified' ou 'disqualified')

4. n8n (a cada 30min):
   - Pega prospects 'qualified' sem mensagem ainda
   - Gera e-mail personalizado via Claude (streaming → DB)
   - Insere em messages (status='awaiting_approval' nos 14d, depois 'queued')

5. Irineu (durante calibração):
   - Abre dashboard, revisa fila de aprovação
   - Aprova em lote ou edita individual

6. n8n (cron a cada 15min):
   - Pega messages status='approved' com scheduled_for <= now
   - Envia via Resend
   - Atualiza status='sent'

7. Resend webhook:
   - Notifica abertura, clique, resposta
   - Atualiza messages

8. Resposta detectada:
   - Haiku 4.5 classifica: 'interested' | 'not_now' | 'unsubscribe' | 'objection'
   - Se interested: Sonnet gera proposta de horário pra reunião
   - Se unsubscribe: marca consent_status='revoked', para envios

9. Reunião agendada:
   - Cria meeting + evento no Google Calendar
   - Move prospect.status='meeting_scheduled'
```

### 5.2 Fluxo de Onboarding (primeira vez)

```
1. Login com Google
2. Wizard de setup:
   - Conecta Google Calendar
   - Conecta domínio de e-mail (Resend DNS records)
   - Conecta WhatsApp Business API
   - Sobe primeiro ICP e prompts
3. Importa lista de clientes atuais (CSV)
4. Cria primeira campanha
5. Roda em modo sombra 14 dias
```

---

## 6. Critérios de Aceitação do MVP

✅ Login funcional com Google
✅ Importar 50 prospects via CSV em <30s
✅ Qualificar 50 prospects via Claude em <5min
✅ Gerar 50 e-mails personalizados em <10min
✅ Aprovar lote de 10 e-mails em <30s no dashboard
✅ Enviar 10 e-mails reais com tracking funcionando
✅ Receber resposta → classificação automática <30s
✅ Agendar reunião automática quando prospect aceita
✅ Endpoint /api/unsubscribe funcional e testado
✅ Audit log registrando ações
✅ Dashboard mostrando: total prospects, sent, opened, replied, meetings
✅ Custo total de IA do MVP < $50

---

## 7. Não-Requisitos (anti-features)

- **NÃO** vai gerar copy genérica. Cada e-mail é personalizado com dado real do prospect.
- **NÃO** vai disparar mensagem sem opt-out. LGPD não é negociável.
- **NÃO** vai armazenar senha de e-mail/WhatsApp. Tudo via API oficial.
- **NÃO** vai ter "modo aprende sozinho" sem supervisão. Owner aprova prompts.

---

## 8. Métricas de Sucesso (90 dias pós-lançamento)

| Métrica | Meta |
|---|---|
| Prospects processados/mês | 1.000+ |
| Taxa de qualificação | 30–50% |
| Taxa de abertura de e-mail | 25%+ |
| Taxa de resposta | 5–10% |
| Reuniões agendadas/mês | 8–15 |
| Clientes fechados/mês | 1–3 |
| Custo IA por reunião agendada | < $10 |
| Tempo manual gasto em prospecção | < 2h/semana |
