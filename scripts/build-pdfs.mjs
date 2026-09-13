import fs from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2"
};

const server = http.createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    const relative = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
    const filePath = path.resolve(root, relative);
    if (filePath !== root && !filePath.startsWith(`${root}${path.sep}`)) throw new Error("Invalid path");
    const data = await fs.readFile(filePath);
    response.writeHead(200, { "Content-Type": mimeTypes[path.extname(filePath)] || "application/octet-stream" });
    response.end(data);
  } catch {
    response.writeHead(404).end("Not found");
  }
});

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const { port } = server.address();
const browser = await chromium.launch({ headless: true });

try {
  const page = await browser.newPage();
  for (const [source, output, title] of [
    ["walkthrough.html", "sql-village-worksheet.pdf", "SQL Village Learner Worksheet"],
    ["teacher-guide.html", "sql-village-teacher-guide.pdf", "SQL Village Teacher Answer Guide"]
  ]) {
    await page.goto(`http://127.0.0.1:${port}/${source}`, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.pdf({
      path: path.join(root, output),
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
      displayHeaderFooter: false,
      tagged: true,
      outline: true
    });
    console.log(`Built ${output} (${title})`);
  }
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}
