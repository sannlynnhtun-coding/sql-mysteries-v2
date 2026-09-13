import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const copies = [
  ["node_modules/codemirror/lib/codemirror.js", "scripts/vendor/codemirror.js"],
  ["node_modules/codemirror/lib/codemirror.css", "scripts/vendor/codemirror.css"],
  ["node_modules/codemirror/mode/sql/sql.js", "scripts/vendor/codemirror-sql.js"],
  ["node_modules/sql.js/dist/sql-wasm.js", "scripts/vendor/sql-wasm.js"],
  ["node_modules/sql.js/dist/sql-wasm.wasm", "scripts/vendor/sql-wasm.wasm"],
  ["node_modules/@fontsource/noto-sans-myanmar/files/noto-sans-myanmar-myanmar-400-normal.woff2", "assets/fonts/noto-sans-myanmar-400-myanmar.woff2"],
  ["node_modules/@fontsource/noto-sans-myanmar/files/noto-sans-myanmar-latin-400-normal.woff2", "assets/fonts/noto-sans-myanmar-400-latin.woff2"],
  ["node_modules/@fontsource/noto-sans-myanmar/files/noto-sans-myanmar-myanmar-600-normal.woff2", "assets/fonts/noto-sans-myanmar-600-myanmar.woff2"],
  ["node_modules/@fontsource/noto-sans-myanmar/files/noto-sans-myanmar-latin-600-normal.woff2", "assets/fonts/noto-sans-myanmar-600-latin.woff2"],
  ["node_modules/@fontsource/noto-sans-myanmar/files/noto-sans-myanmar-myanmar-700-normal.woff2", "assets/fonts/noto-sans-myanmar-700-myanmar.woff2"],
  ["node_modules/@fontsource/noto-sans-myanmar/files/noto-sans-myanmar-latin-700-normal.woff2", "assets/fonts/noto-sans-myanmar-700-latin.woff2"],
  ["node_modules/@fontsource/bebas-neue/files/bebas-neue-latin-400-normal.woff2", "assets/fonts/bebas-neue-400-latin.woff2"],
  ["node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2", "assets/fonts/jetbrains-mono-400-latin.woff2"],
  ["node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-600-normal.woff2", "assets/fonts/jetbrains-mono-600-latin.woff2"],
  ["node_modules/@fontsource/noto-sans-myanmar/LICENSE", "assets/fonts/OFL-Noto-Sans-Myanmar.txt"],
  ["node_modules/@fontsource/bebas-neue/LICENSE", "assets/fonts/OFL-Bebas-Neue.txt"],
  ["node_modules/@fontsource/jetbrains-mono/LICENSE", "assets/fonts/OFL-JetBrains-Mono.txt"]
];

for (const [source, destination] of copies) {
  const from = path.join(root, source);
  const to = path.join(root, destination);
  await fs.mkdir(path.dirname(to), { recursive: true });
  await fs.copyFile(from, to);
}

console.log(`Copied ${copies.length} local runtime and font assets`);
