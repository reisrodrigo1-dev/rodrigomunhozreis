// Atualiza coverUrl do post GTA no seed-posts.ts com a imagem em base64
// (e bumpa contentVersion para 2 — assim o /admin "Importar" atualiza o Firestore).
import { readFileSync, writeFileSync } from "node:fs";

const SEED = "src/lib/seed-posts.ts";
const IMG = "C:\\Users\\Rodrigo Reis\\Downloads\\GTA_IMAGE.png";
const SLUG = "gta-vi-ia-controlada-vs-generativa-2026";

const png = readFileSync(IMG);
const dataUrl = `data:image/png;base64,${png.toString("base64")}`;
console.log(`imagem: ${png.length} bytes · data URL: ${dataUrl.length} chars`);

let h = readFileSync(SEED, "utf8");
const i = h.indexOf(`slug: "${SLUG}"`);
if (i < 0) throw new Error("slug não encontrado");

// Acha o bloco do post (de id até a próxima fronteira "},")
const blockStart = h.lastIndexOf("{", i);
const blockEnd = h.indexOf("\n  },", i) + 4;
const before = h.slice(0, blockStart);
const after = h.slice(blockEnd);
let block = h.slice(blockStart, blockEnd);

// Substitui coverUrl
block = block.replace(/coverUrl:\s*\n?\s*"[^"]*"/, `coverUrl: "${dataUrl}"`);
// Bumpa contentVersion: 1 → 2 (ou cria, se não existir)
if (/contentVersion:\s*\d+/.test(block)) {
  block = block.replace(/contentVersion:\s*(\d+)/, (_, v) => `contentVersion: ${Number(v) + 1}`);
} else {
  block = block.replace(/(status:\s*"published",)/, `$1\n    contentVersion: 2,`);
}

writeFileSync(SEED, before + block + after, "utf8");
console.log("OK · seed-posts.ts atualizado (coverUrl + contentVersion).");
