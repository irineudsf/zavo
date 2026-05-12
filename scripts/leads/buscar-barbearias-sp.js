#!/usr/bin/env node

/**
 * Busca barbearias em São Paulo sem site no Google Maps via Apify
 * Exporta resultado em CSV pronto para abordagem comercial
 */

const https = require("https");
const fs = require("fs");
const path = require("path");

const APIFY_TOKEN = process.env.APIFY_TOKEN;
const ACTOR_ID = "compass~crawler-google-places";

const INPUT = {
  searchStringsArray: [
    "barbearia Vila Mariana São Paulo SP",
    "barbearia Pinheiros São Paulo SP",
    "barbearia Mooca São Paulo SP",
    "barbearia Santana São Paulo SP",
    "barbearia Santo André São Paulo SP",
    "barbearia Tatuapé São Paulo SP",
    "barbearia Lapa São Paulo SP",
    "barbearia Itaquera São Paulo SP",
  ],
  maxCrawledPlacesPerSearch: 100,
  language: "pt-BR",
  countryCode: "br",
  includeWebResults: false,
};

function apifyRequest(method, path, body) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "api.apify.com",
      path,
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${APIFY_TOKEN}`,
      },
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          resolve(JSON.parse(data));
        } catch {
          resolve(data);
        }
      });
    });

    req.on("error", reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function aguardarRun(runId) {
  console.log("⏳ Aguardando scraper terminar...");
  while (true) {
    const res = await apifyRequest("GET", `/v2/actor-runs/${runId}`, null);
    const status = res.data?.status;
    process.stdout.write(`   Status: ${status}\r`);
    if (status === "SUCCEEDED") {
      console.log("\n✅ Scraper finalizado!");
      return res.data.defaultDatasetId;
    }
    if (["FAILED", "ABORTED", "TIMED-OUT"].includes(status)) {
      throw new Error(`Run falhou com status: ${status}`);
    }
    await sleep(5000);
  }
}

function escapeCsv(value) {
  if (!value) return "";
  const str = String(value);
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

async function main() {
  if (!APIFY_TOKEN) {
    console.error("❌ Defina a variável APIFY_TOKEN antes de rodar");
    console.error("   export APIFY_TOKEN=sua_chave_aqui");
    process.exit(1);
  }

  console.log("🔍 Iniciando busca: barbearias em São Paulo sem site...\n");

  // Inicia o actor
  const runRes = await apifyRequest(
    "POST",
    `/v2/acts/${ACTOR_ID}/runs?token=${APIFY_TOKEN}`,
    INPUT
  );

  if (!runRes.data?.id) {
    console.error("❌ Erro ao iniciar run:", JSON.stringify(runRes, null, 2));
    process.exit(1);
  }

  const runId = runRes.data.id;
  console.log(`🚀 Run iniciado: ${runId}`);

  // Aguarda conclusão
  const datasetId = await aguardarRun(runId);

  // Busca resultados
  console.log("📦 Baixando resultados...");
  const dataset = await apifyRequest(
    "GET",
    `/v2/datasets/${datasetId}/items?limit=1000`,
    null
  );

  const items = Array.isArray(dataset) ? dataset : dataset.items || [];
  console.log(`   Total coletado: ${items.length} lugares`);

  // Filtra sem site E somente São Paulo - SP
  const semSite = items.filter(
    (item) =>
      !item.website &&
      item.phone &&
      item.address &&
      /São Paulo - SP|São Paulo, SP/i.test(item.address)
  );

  console.log(`   Sem site (com telefone): ${semSite.length} leads\n`);

  if (semSite.length === 0) {
    console.log("⚠️  Nenhum lead encontrado. Tente aumentar maxCrawledPlacesPerSearch.");
    return;
  }

  // Gera CSV
  const linhas = [
    ["Nome", "Telefone", "Endereço", "Bairro", "Avaliação", "Nº Avaliações", "Google Maps URL"].join(","),
    ...semSite.map((item) =>
      [
        escapeCsv(item.title),
        escapeCsv(item.phone),
        escapeCsv(item.address),
        escapeCsv(item.neighborhood || item.city),
        escapeCsv(item.totalScore),
        escapeCsv(item.reviewsCount),
        escapeCsv(item.url),
      ].join(",")
    ),
  ];

  const nomeArquivo = `leads-barbearias-sp-${Date.now()}.csv`;
  const caminho = path.join(__dirname, nomeArquivo);
  fs.writeFileSync(caminho, linhas.join("\n"), "utf-8");

  console.log(`✅ CSV gerado: scripts/leads/${nomeArquivo}`);
  console.log(`📊 ${semSite.length} leads prontos para abordagem!`);
  console.log("\n📋 Prévia dos primeiros 5:");
  semSite.slice(0, 5).forEach((l, i) => {
    console.log(`   ${i + 1}. ${l.title} — ${l.phone} — ${l.neighborhood || l.city || ""}`);
  });
}

main().catch(console.error);
