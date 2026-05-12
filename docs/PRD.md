# PRD — Zavo

**Documento de Requisitos do Produto (Product Requirements Document)**
Versão: 1.0 — MVP
Última atualização: Maio 2026

---

## 1. Visão Geral (Overview)

**Zavo** é o sistema interno de gestão comercial da **Zavo Tech**, empresa que oferece construção de websites, desenvolvimento de aplicativos e implementação de inteligência artificial para pequenas e médias empresas e profissionais autônomos.

O sistema centraliza, em uma única plataforma operada por um administrador único, todo o ciclo comercial: da captura automática de leads na internet, passando pela qualificação com IA, conversão em cliente, gestão de contrato e recebimento de pagamento.

---

## 2. Problema (Problem)

Hoje, o ciclo comercial da Zavo Tech depende de processos manuais e de múltiplas ferramentas desconectadas (planilhas, e-mail, anotações). Isso gera:

- Perda de leads por falta de acompanhamento (follow-up)
- Tempo excessivo em prospecção manual
- Dificuldade de medir conversão e receita
- Falta de centralização de contratos e pagamentos

---

## 3. Solução (Solution)

Uma plataforma web única (operada via login admin) que automatiza a prospecção via **Apify**, qualifica leads com **IA**, organiza o funil de vendas, gerencia contratos de clientes, processa pagamentos via **Stripe** e exibe métricas em tempo real.

---

## 4. Público-Alvo (Target Audience)

**Usuário do sistema:**
- **Único administrador** — Irineu Fernandes (proprietário da Zavo Tech)

**Cliente final da Zavo Tech (não usa o sistema, mas é registrado nele):**
- Pequenas e médias empresas (PMEs) sem presença online
- Profissionais autônomos que precisam de website
- Empresas que já possuem site e buscam automação ou aplicação de IA

---

## 5. Personas

### Persona 1 — Irineu (Administrador / Operador do Sistema)
- **Perfil:** Empreendedor brasileiro nos EUA, opera múltiplos negócios, tem conhecimento técnico crescente, valoriza automação.
- **Dor:** Falta de tempo. Precisa que o sistema reduza tarefas manuais ao mínimo.
- **Objetivo:** Aumentar volume de leads qualificados e fechar mais contratos com menos esforço operacional.

### Persona 2 — Cliente PME (registrado no CRM, não acessa o sistema)
- **Perfil:** Dono de negócio local (restaurante, oficina, consultório, autônomo), sem site ou com site desatualizado.
- **Dor:** Não tem presença online, perde clientes para concorrentes que aparecem no Google.
- **Objetivo:** Ter um site profissional e, depois, ferramentas que otimizem suas vendas.

---

## 6. User Stories (Histórias de Usuário)

### Autenticação
- **US01** — Como admin, eu quero fazer login com e-mail e senha para acessar o sistema com segurança.

### CRM (Gestão de Clientes e Contratos)
- **US02** — Como admin, eu quero cadastrar clientes (empresa, contato, e-mail, telefone) para manter um banco organizado.
- **US03** — Como admin, eu quero registrar contratos vinculados a cada cliente (tipo de serviço, valor, data de início, status) para controlar o que foi vendido.
- **US04** — Como admin, eu quero registrar interações com clientes (notas, data, tipo de contato) para ter histórico do relacionamento.

### Pipeline de Leads (Funil)
- **US05** — Como admin, eu quero visualizar leads em formato Kanban com colunas (Novo → Em Contato → Proposta Enviada → Fechado / Perdido) para gerenciar o funil visualmente.
- **US06** — Como admin, eu quero arrastar leads entre colunas para atualizar o estágio rapidamente.
- **US07** — Como admin, eu quero converter um lead em cliente quando o contrato for fechado, mantendo o histórico.

### Prospecção Automática (Apify + IA)
- **US08** — Como admin, eu quero disparar uma busca de prospecção informando critérios (nicho, localização, palavra-chave) para que o Apify retorne leads automaticamente.
- **US09** — Como admin, eu quero que cada lead importado seja enriquecido por IA com um score de qualificação (0–100) e um resumo do potencial, para priorizar atendimento.
- **US10** — Como admin, eu quero que leads importados entrem automaticamente na coluna "Novo" do pipeline.

### Pagamentos (Stripe)
- **US11** — Como admin, eu quero gerar um link de cobrança Stripe vinculado a um contrato para enviar ao cliente.
- **US12** — Como admin, eu quero ver o status do pagamento (pendente, pago, falhou, reembolsado) atualizado automaticamente via webhook.
- **US13** — Como admin, eu quero registrar pagamentos manuais (Pix, boleto, transferência) para contratos que não usem Stripe.

### Dashboard
- **US14** — Como admin, eu quero ver no dashboard: total de leads no mês, taxa de conversão, contratos ativos, receita do mês e MRR (receita recorrente mensal).
- **US15** — Como admin, eu quero filtrar o dashboard por período (mês, trimestre, ano) para análise comparativa.

---

## 7. Métricas de Sucesso (KPIs / Success Metrics)

### Métricas de Produto (do sistema)
- Tempo médio para cadastrar um lead manualmente: < 30 segundos
- Tempo de resposta de qualquer página: < 2 segundos
- Disponibilidade (uptime): ≥ 99,5%

### Métricas de Negócio (impacto na Zavo Tech)
- Volume de leads prospectados/mês: meta de 200+ no 3º mês
- Taxa de conversão lead → cliente: meta de 5%+ no 6º mês
- Receita mensal (MRR + projetos únicos): crescimento de 20% mês a mês nos primeiros 6 meses
- Tempo médio do ciclo de venda (lead → pagamento): redução de 50% vs. processo manual

---

## 8. Fora de Escopo (Out of Scope) — MVP

Os itens abaixo **não fazem parte da primeira versão** e poderão ser adicionados em iterações futuras:

- ❌ Site institucional público (já existe separado em zavo.digital)
- ❌ Portal do cliente (área logada para o cliente final)
- ❌ Sistema multiusuário com papéis (admin, vendedor, suporte)
- ❌ Aplicativo mobile nativo (iOS/Android)
- ❌ Integração com WhatsApp Business
- ❌ Geração automática de propostas/contratos em PDF
- ❌ Faturamento recorrente (subscription billing) — apenas pagamentos únicos via Stripe
- ❌ Multilíngue — sistema apenas em português brasileiro
- ❌ Integração com e-mail marketing (Mailchimp, ActiveCampaign)
- ❌ Calendário e agendamento de reuniões

---

## 9. Premissas e Restrições (Assumptions & Constraints)

### Premissas
- Admin tem acesso a internet estável
- Admin possui contas ativas em: Apify, Stripe, Supabase, Vercel, Anthropic API
- Volume inicial estimado: até 1.000 leads e 100 clientes nos primeiros 6 meses

### Restrições
- Orçamento de infraestrutura mensal limitado (planos gratuitos/iniciais de Supabase, Vercel, Resend)
- Sistema operará apenas em português brasileiro no MVP
- Apenas um admin terá acesso (sem multiusuário)

---

## 10. Próximos Passos Após MVP (Roadmap Futuro)

1. Portal do cliente final (acompanhar projeto, baixar contrato, ver pagamentos)
2. Geração automática de proposta comercial em PDF
3. Integração WhatsApp Business para outreach
4. Sistema multiusuário (vendedor, suporte)
5. Subscription billing para clientes em planos mensais
6. App mobile (React Native ou PWA)
