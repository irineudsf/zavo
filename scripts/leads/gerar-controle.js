#!/usr/bin/env node

/**
 * Gera planilha de controle de leads a partir do CSV de barbearias
 */

const fs = require("fs");
const path = require("path");

const LEADS_CSV = path.join(__dirname, "leads-barbearias-sp-1777592035927.csv");
const SAIDA = path.join(__dirname, `controle-leads-barbearias-sp-${Date.now()}.csv`);

function parseCsvLine(line) {
  const result = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

function escapeCsv(value) {
  if (!value) return "";
  const str = String(value);
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

const linhas = fs.readFileSync(LEADS_CSV, "utf-8").split("\n").filter(Boolean);
const [, ...dataLines] = linhas; // pula cabeçalho

const cabecalho = [
  "Nome",
  "Telefone",
  "Bairro",
  "Avaliação Google",
  "Nº Avaliações",
  "Google Maps",
  "Script Versão",
  "Status",
  "Data Msg 1",
  "Data Follow-up",
  "Data Encerramento",
  "Resposta do Lead",
  "Observações",
].join(",");

const STATUS_INICIAL = "Não contactado";

const linhasControle = dataLines.map((linha) => {
  const cols = parseCsvLine(linha);
  const nome = cols[0] || "";
  const telefone = cols[1] || "";
  const bairro = cols[3] || "";
  const avaliacao = cols[4] || "";
  const numAvaliacoes = cols[5] || "";
  const mapsUrl = cols[6] || "";

  return [
    escapeCsv(nome),
    escapeCsv(telefone),
    escapeCsv(bairro),
    escapeCsv(avaliacao),
    escapeCsv(numAvaliacoes),
    escapeCsv(mapsUrl),
    "",              // Script Versão (V1, V2 ou V3)
    STATUS_INICIAL,  // Status
    "",              // Data Msg 1
    "",              // Data Follow-up
    "",              // Data Encerramento
    "",              // Resposta do Lead
    "",              // Observações
  ].join(",");
});

const conteudo = [cabecalho, ...linhasControle].join("\n");
fs.writeFileSync(SAIDA, conteudo, "utf-8");

console.log(`✅ Planilha de controle gerada!`);
console.log(`📊 ${linhasControle.length} leads carregados`);
console.log(`📁 Arquivo: scripts/leads/${path.basename(SAIDA)}`);
console.log(`\n📋 Colunas:`);
console.log(`   • Script Versão → preencha: V1, V2 ou V3`);
console.log(`   • Status → opções:`);
console.log(`       Não contactado`);
console.log(`       Msg 1 enviada`);
console.log(`       Follow-up enviado`);
console.log(`       Encerramento enviado`);
console.log(`       Respondeu`);
console.log(`       Reunião marcada`);
console.log(`       Fechado ✅`);
console.log(`       Sem interesse ❌`);
