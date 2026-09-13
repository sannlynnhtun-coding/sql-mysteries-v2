import fs from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = process.env.SQL_VILLAGE_VISUAL_DIR
  ? path.resolve(process.env.SQL_VILLAGE_VISUAL_DIR)
  : path.join(root, "tests", "artifacts");
await fs.mkdir(output, { recursive: true });

const types = {
  ".css": "text/css; charset=utf-8",
  ".db": "application/vnd.sqlite3",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".wasm": "application/wasm",
  ".woff2": "font/woff2"
};

const server = http.createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    const relative = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
    const file = path.resolve(root, relative);
    if (!file.startsWith(`${root}${path.sep}`)) throw new Error("Invalid path");
    response.writeHead(200, { "Content-Type": types[path.extname(file)] || "application/octet-stream" });
    response.end(await fs.readFile(file));
  } catch {
    response.writeHead(404).end("Not found");
  }
});

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const { port } = server.address();
const browser = await chromium.launch({ headless: true });

try {
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
  await desktop.goto(`http://127.0.0.1:${port}/`, { waitUntil: "networkidle" });
  await desktop.evaluate(() => document.fonts.ready);
  console.log("Editor styles", await desktop.locator(".CodeMirror").evaluate((element) => ({
    background: getComputedStyle(element).backgroundColor,
    color: getComputedStyle(element).color,
    font: getComputedStyle(element).fontFamily
  })));
  await desktop.screenshot({ path: path.join(output, "desktop-start.png"), fullPage: true });
  await fs.writeFile(path.join(output, "accessibility-start.yml"), await desktop.locator("body").ariaSnapshot(), "utf8");

  await desktop.evaluate(() => {
    localStorage.setItem("sql-village-golden-duck:v1", JSON.stringify({
      activeStep: 5,
      unlockedStep: 5,
      complete: true,
      drafts: {}
    }));
  });
  await desktop.reload({ waitUntil: "networkidle" });
  await desktop.evaluate(() => document.fonts.ready);
  await desktop.screenshot({ path: path.join(output, "desktop-complete.png"), fullPage: true });

  const mobile = await browser.newPage({ viewport: { width: 375, height: 812 }, deviceScaleFactor: 1 });
  await mobile.goto(`http://127.0.0.1:${port}/`, { waitUntil: "networkidle" });
  await mobile.evaluate(() => document.fonts.ready);
  await mobile.screenshot({ path: path.join(output, "mobile-start.png"), fullPage: true });
  await fs.writeFile(path.join(output, "accessibility-mobile.yml"), await mobile.locator("body").ariaSnapshot(), "utf8");

  console.log(`Visual QA artifacts written to ${output}`);
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}
