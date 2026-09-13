import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
await sharp(path.join(root, "schema.svg"))
  .png()
  .toFile(path.join(root, "schema.png"));

console.log("Rendered schema.png");
