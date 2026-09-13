import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import initSqlJs from "sql.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const wasmPath = path.join(root, "node_modules", "sql.js", "dist", "sql-wasm.wasm");
const schemaPath = path.join(root, "database", "setup.sql");
const outputPath = path.join(root, "sql-village-theft.db");

const SQL = await initSqlJs({ locateFile: () => wasmPath });
const database = new SQL.Database();
database.run(await fs.readFile(schemaPath, "utf8"));
await fs.writeFile(outputPath, Buffer.from(database.export()));
database.close();

console.log(`Built ${path.relative(root, outputPath)}`);
