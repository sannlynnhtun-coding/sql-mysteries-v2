import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "public");
const runtimeFiles = [
  "index.html",
  "walkthrough.html",
  "teacher-guide.html",
  "schema.png",
  "schema.svg",
  "sql-village-theft.db",
  "sql-village-worksheet.pdf",
  "sql-village-teacher-guide.pdf",
  "assets/golden-duck.svg",
  "css/app.css",
  "scripts/app.js",
  "scripts/db-worker.js"
];
const runtimeDirectories = ["assets/fonts", "scripts/vendor"];

await fs.rm(output, { recursive: true, force: true });
await fs.mkdir(output, { recursive: true });

for (const relativePath of runtimeFiles) {
  const destination = path.join(output, relativePath);
  await fs.mkdir(path.dirname(destination), { recursive: true });
  await fs.copyFile(path.join(root, relativePath), destination);
}

for (const relativePath of runtimeDirectories) {
  await fs.cp(path.join(root, relativePath), path.join(output, relativePath), { recursive: true });
}

console.log(`Packaged ${runtimeFiles.length} files and ${runtimeDirectories.length} directories in public/`);
