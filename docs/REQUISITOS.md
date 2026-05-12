# REQUISITOS — Zavo

**Requisitos Funcionais e Não-Funcionais**
Versão: 1.0 — MVP
Última atualização: Maio 2026

---

## 1. Requisitos Funcionais (RF)

### 1.1 Autenticação e Acesso

#### RF01 — Login de Administrador
- O sistema deve permitir login do admin via e-mail e senha (Supabase Auth).
- **Critério de Aceitação (Acceptance Criteria):**
  - Login válido redireciona para `/dashboard`
  - Login inválido exibe mensagem de erro clara
  - Sessão persiste entre refreshes (atualizações da página)

#### RF02 — Recuperação de Senha
- O sistema deve permitir recuperação de senha via e-mail (link mágico ou reset).
- **Critério de Aceitação:**
  - E-mail é enviado em até 1 minuto
  - Link expira em 1 hora

#### RF03 — Logout
- O sistema deve permitir logout com 1 clique, encerrando a sessão.

#### RF04 — Proteção de Rotas
- Todas as rotas internas (exceto login e recuperação) devem exigir autenticação.
- **Critério de Aceitação:** Acesso direto a rota protegida sem login redireciona para `/login`.

---

### 1.2 CRM — Gestão de Clientes

#### RF05 — Cadastro de Cliente
- O sistema deve permitir cadastrar clientes com os campos:
  - Nome da empresa (obrigatório)
  - Nome do contato principal (obrigatório)
  - E-mail (obrigatório, validado)
  - Telefone (opcional, máscara internacional)
  - Site atual (opcional)
  - Nicho/segmento (opcional)
  - Endereço (opcional)
  - Observações (opcional, texto livre)
- **Critério de Aceitação:** Cliente salvo aparece na listagem em até 1 segundo.

#### RF06 — Listagem de Clientes
- O sistema deve listar todos os clientes em tabela com:
  - Busca por nome, e-mail ou empresa
  - Filtro por status (ativo, inativo, prospect)
  - Ordenação por data de cadastro, nome, valor de contrato

#### RF07 — Edição e Exclusão de Cliente
- O sistema deve permitir editar todos os campos de um cliente.
- O sistema deve permitir excluir um cliente (soft delete — exclusão lógica).
- **Critério de Aceitação:** Confirmação obrigatória antes de excluir.

#### RF08 — Detalhes do Cliente
- O sistema deve exibir página individual de cliente com:
  - Dados cadastrais
  - Lista de contratos vinculados
  - Histórico de interações
  - Lista de pagamentos

---

### 1.3 Contratos

#### RF09 — Cadastro de Contrato
- O sistema deve permitir cadastrar contratos vinculados a um cliente com:
  - Tipo de serviço (website, app, automação IA, manutenção, outro)
  - Descrição (texto livre)
  - Valor total (em USD)
  - Data de início
  - Data prevista de entrega
  - Status (rascunho, ativo, concluído, cancelado)

#### RF10 — Listagem e Filtros de Contratos
- O sistema deve listar contratos com filtros por status, tipo de serviço e cliente.

---

### 1.4 Interações

#### RF11 — Registro de Interação
- O sistema deve permitir registrar interações com clientes/leads:
  - Tipo (e-mail, ligação, reunião, mensagem, outro)
  - Data/hora
  - Resumo (texto livre)

---

### 1.5 Pipeline de Leads

#### RF12 — Visualização Kanban
- O sistema deve exibir leads em formato Kanban com 5 colunas fixas:
  - Novo
  - Em Contato
  - Proposta Enviada
  - Fechado (Ganho)
  - Perdido

#### RF13 — Drag-and-Drop (Arrastar e Soltar)
- O sistema deve permitir arrastar cards de lead entre colunas, atualizando o estágio no banco em tempo real.
- **Critério de Aceitação:** Atualização persistida em até 500ms.

#### RF14 — Cadastro Manual de Lead
- O sistema deve permitir cadastro manual de lead com:
  - Nome (empresa ou pessoa)
  - E-mail (opcional)
  - Telefone (opcional)
  - Origem (manual, Apify, indicação, outro)
  - Observações
  - Score de qualificação (0–100, opcional)

#### RF15 — Conversão de Lead em Cliente
- O sistema deve permitir converter um lead em cliente em 1 clique quando movido para "Fechado".
- **Critério de Aceitação:**
  - Dados do lead são copiados para a tabela de clientes
  - Histórico do lead é mantido
  - Lead é marcado como "convertido"

---

### 1.6 Prospecção Automática (Apify + IA)

#### RF16 — Disparo de Busca via Apify
- O sistema deve permitir disparar atores (actors) do Apify informando:
  - Ator selecionado (ex.: Google Maps Scraper, LinkedIn Scraper)
  - Parâmetros (nicho, localização, palavras-chave, quantidade)
- **Critério de Aceitação:** Busca é registrada no banco com status "executando".

#### RF17 — Importação Automática de Leads
- O sistema deve receber resultados do Apify (via webhook ou polling) e importar como leads.
- **Critério de Aceitação:**
  - Cada resultado vira um lead na coluna "Novo"
  - Duplicatas são detectadas por e-mail ou telefone

#### RF18 — Enriquecimento por IA
- O sistema deve enviar cada lead importado para a Anthropic API (Claude) que retornará:
  - Score de qualificação (0–100)
  - Resumo de potencial (1–2 frases)
  - Sugestão de abordagem (1 frase)
- **Critério de Aceitação:** Enriquecimento ocorre em background, sem bloquear a importação.

#### RF19 — Histórico de Buscas
- O sistema deve manter histórico de buscas Apify com data, parâmetros, quantidade de leads retornados e status.

---

### 1.7 Pagamentos (Stripe)

#### RF20 — Geração de Link de Cobrança
- O sistema deve permitir gerar Payment Link do Stripe vinculado a um contrato.
- **Critério de Aceitação:** Link é gerado em até 3 segundos e armazenado no banco.

#### RF21 — Webhook de Status de Pagamento
- O sistema deve receber webhooks do Stripe e atualizar o status do pagamento automaticamente:
  - `pending` (pendente)
  - `succeeded` (pago)
  - `failed` (falhou)
  - `refunded` (reembolsado)

#### RF22 — Registro Manual de Pagamento
- O sistema deve permitir registrar pagamentos manuais (Pix, boleto, transferência, dinheiro) com:
  - Valor
  - Data
  - Método
  - Comprovante (upload opcional, máx. 5MB)

#### RF23 — Listagem de Pagamentos
- O sistema deve listar pagamentos com filtros por status, cliente, contrato e período.

---

### 1.8 Dashboard

#### RF24 — Métricas Principais
- O dashboard deve exibir:
  - Total de leads no mês (com comparativo mês anterior)
  - Taxa de conversão (leads → clientes)
  - Contratos ativos (quantidade e valor total)
  - Receita do mês (USD)
  - MRR — Monthly Recurring Revenue (Receita Recorrente Mensal)

#### RF25 — Gráficos
- O dashboard deve exibir:
  - Gráfico de linha: leads por dia (últimos 30 dias)
  - Gráfico de barras: receita por mês (últimos 12 meses)
  - Gráfico de pizza: leads por origem (manual, Apify, indicação, outro)

#### RF26 — Filtros de Período
- O dashboard deve permitir filtrar por período (mês atual, trimestre, ano, customizado).

---

## 2. Requisitos Não-Funcionais (RNF)

### 2.1 Performance

#### RNF01 — Tempo de Resposta
- Páginas devem carregar em até 2 segundos em conexão de banda larga padrão.
- Operações de drag-and-drop devem persistir em até 500ms.

#### RNF02 — Carregamento Progressivo
- Listas longas (100+ itens) devem usar paginação ou virtualização.

---

### 2.2 Segurança

#### RNF03 — Autenticação Segura
- Senhas devem ser armazenadas com hash bcrypt (gerenciado pelo Supabase Auth).
- Sessões devem usar JWT (JSON Web Token) com expiração configurada.

#### RNF04 — Row Level Security (RLS / Segurança em Nível de Linha)
- Todas as tabelas devem ter políticas RLS no Supabase, garantindo que apenas o admin autenticado acesse os dados.

#### RNF05 — Variáveis de Ambiente
- Chaves sensíveis (API keys do Apify, Stripe, Anthropic) devem estar em variáveis de ambiente (`.env.local`), nunca no código.

#### RNF06 — Validação de Entrada
- Todos os formulários devem validar dados no frontend (Zod) e no backend (Zod ou Supabase constraints).

#### RNF07 — Webhooks Assinados
- Webhooks do Stripe devem validar assinatura (signature verification) para evitar requisições maliciosas.

---

### 2.3 Escalabilidade

#### RNF08 — Arquitetura Serverless
- O sistema deve rodar em arquitetura serverless (Vercel + Supabase) para escalar automaticamente sem intervenção manual.

#### RNF09 — Capacidade Inicial
- O sistema deve suportar pelo menos 10.000 leads e 1.000 clientes sem degradação de performance.

---

### 2.4 Disponibilidade

#### RNF10 — Uptime
- O sistema deve manter disponibilidade ≥ 99,5% (limitado aos SLAs de Vercel e Supabase).

#### RNF11 — Backups
- O Supabase deve ter backups automáticos diários habilitados.

---

### 2.5 Usabilidade

#### RNF12 — Idioma
- Interface 100% em português brasileiro.
- Termos técnicos do mercado (ex.: "pipeline", "dashboard", "lead") podem ser mantidos em inglês.

#### RNF13 — Responsividade
- O sistema deve funcionar em desktop (prioridade) e tablet.
- Mobile não é prioridade no MVP, mas o layout não deve quebrar.

#### RNF14 — Feedback Visual
- Ações do usuário devem ter feedback imediato (toast notifications, loading states).

---

### 2.6 Manutenibilidade

#### RNF15 — Convenções de Código
- Uso de TypeScript em 100% do código.
- ESLint + Prettier configurados.
- Nomenclatura: variáveis em inglês, comentários em português brasileiro.

#### RNF16 — Documentação
- Cada módulo crítico (auth, prospecção, pagamentos) deve ter README próprio.

#### RNF17 — Versionamento
- Uso obrigatório de Git com Conventional Commits (feat, fix, docs, refactor, etc.).

---

### 2.7 Acessibilidade

#### RNF18 — Padrão WCAG
- Interface deve seguir WCAG 2.1 nível AA (contraste, navegação por teclado, labels semânticos).

---

### 2.8 Custos

#### RNF19 — Otimização de Custos de IA
- Chamadas à Anthropic API devem usar o modelo mais econômico que atenda à qualidade (sugestão inicial: Claude Haiku 4.5).
- Resultados de enriquecimento devem ser armazenados em cache no banco para evitar reprocessamento.

#### RNF20 — Otimização de Custos de Apify
- Limitar quantidade máxima de leads por busca (ex.: 100 por execução) para controlar gastos.

---

## 3. Critérios Globais de Aceitação (Definition of Done)

Uma funcionalidade é considerada **pronta** quando:

1. ✅ Código está em TypeScript com tipos explícitos
2. ✅ Validação de dados no frontend e backend
3. ✅ RLS configurado nas tabelas afetadas
4. ✅ Tratamento de erros com mensagens amigáveis ao usuário
5. ✅ Loading states e feedback visual implementados
6. ✅ Testado manualmente nos cenários principais (happy path + 2 erros comuns)
7. ✅ Variáveis de ambiente documentadas em `.env.example`
8. ✅ Commit seguindo Conventional Commits
9. ✅ Deploy testado em Vercel preview branch antes de merge
