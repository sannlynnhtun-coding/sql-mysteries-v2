import assert from "node:assert/strict";
import fs from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import initSqlJs from "sql.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

async function verifyDatabase() {
  const SQL = await initSqlJs({
    locateFile: () => path.join(root, "node_modules", "sql.js", "dist", "sql-wasm.wasm")
  });
  const bytes = await fs.readFile(path.join(root, "sql-village-theft.db"));
  const database = new SQL.Database(bytes);

  const tableResult = database.exec("SELECT name FROM sqlite_master WHERE type = 'table' ORDER BY name;")[0];
  assert.deepEqual(tableResult.values.flat(), ["crime_reports", "interviews", "memberships", "people"]);

  const expectedCounts = { crime_reports: 5, people: 12, interviews: 5, memberships: 8 };
  for (const [table, expected] of Object.entries(expectedCounts)) {
    const count = database.exec(`SELECT COUNT(*) FROM ${table};`)[0].values[0][0];
    assert.equal(count, expected, `${table} row count`);
  }

  const witnessOne = database.exec("SELECT person_id, name FROM people WHERE address_street = 'Padauk Street' ORDER BY address_number DESC LIMIT 1;")[0].values;
  assert.deepEqual(witnessOne, [[3, "U Hla Aung"]]);

  const witnessTwo = database.exec("SELECT person_id, name FROM people WHERE name LIKE 'Thiri%' AND address_street = 'Inya Road';")[0].values;
  assert.deepEqual(witnessTwo, [[4, "Thiri Win"]]);

  const thief = database.exec("SELECT p.name, p.age, m.gym_name, m.membership_status FROM people p JOIN memberships m ON p.person_id = m.person_id WHERE m.gym_name = 'FitLife Gym' AND m.membership_status = 'gold';")[0].values;
  assert.deepEqual(thief, [["Nandar Hlaing", 29, "FitLife Gym", "gold"]]);

  const foreignKeyErrors = database.exec("PRAGMA foreign_key_check;");
  assert.equal(foreignKeyErrors.length, 0, "foreign keys should be valid");
  database.close();
  console.log("✓ database contract");
}

function createServer() {
  const mimeTypes = {
    ".css": "text/css; charset=utf-8",
    ".db": "application/vnd.sqlite3",
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".svg": "image/svg+xml",
    ".wasm": "application/wasm",
    ".woff2": "font/woff2"
  };

  return http.createServer(async (request, response) => {
    try {
      const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
      const relative = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
      const filePath = path.resolve(root, relative);
      if (filePath !== root && !filePath.startsWith(`${root}${path.sep}`)) throw new Error("Invalid path");
      const data = await fs.readFile(filePath);
      response.writeHead(200, {
        "Content-Type": mimeTypes[path.extname(filePath)] || "application/octet-stream",
        "Cache-Control": "no-store"
      });
      response.end(data);
    } catch {
      response.writeHead(404).end("Not found");
    }
  });
}

async function setEditor(page, sql) {
  await page.evaluate((value) => {
    document.querySelector(".CodeMirror").CodeMirror.setValue(value);
  }, sql);
}

async function verifyBrowser() {
  const server = createServer();
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address();
  const browser = await chromium.launch({ headless: true });

  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    const browserErrors = [];
    page.on("pageerror", (error) => browserErrors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") browserErrors.push(message.text());
    });
    await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: "networkidle" });
    await page.waitForFunction(() => document.querySelector("#database-status")?.dataset.state === "ready");
    assert.equal(await page.locator("#step-nav button:disabled").count(), 5);

    await page.keyboard.press("Tab");
    assert.equal(await page.locator(".skip-link").evaluate((element) => element === document.activeElement), true, "skip link receives first focus");

    await page.locator("#show-hint").click();
    await page.getByText("Hint 1 / 2").waitFor();
    await page.locator("#show-hint").click();
    await page.getByText("Hint 2 / 2").waitFor();
    assert.equal(await page.locator("#show-solution").isVisible(), true);

    await setEditor(page, "SELECT name FROM people LIMIT 1;");
    await page.locator("#run-query").click();
    await page.getByText("Result မကိုက်သေးပါ။").waitFor();
    assert.equal((await page.evaluate(() => window.__sqlVillage.getState())).unlockedStep, 0);

    await setEditor(page, "INSERT INTO people VALUES (99, 'Wrong', 1, 'Nowhere', 1);");
    await page.locator("#run-query").click();
    await page.getByText("SELECT query တစ်ခုတည်းသာ").waitFor();
    assert.equal((await page.evaluate(() => window.__sqlVillage.getState())).unlockedStep, 0);

    const firstSolution = await page.evaluate(() => window.__sqlVillage.lessons[0].solution);
    await setEditor(page, firstSolution);
    await page.locator("#run-query").click();
    await page.getByText("မှန်ပါတယ်!").waitFor();
    assert.equal((await page.evaluate(() => window.__sqlVillage.getState())).unlockedStep, 1);

    await page.reload({ waitUntil: "networkidle" });
    await page.waitForFunction(() => document.querySelector("#database-status")?.dataset.state === "ready");
    assert.equal((await page.evaluate(() => window.__sqlVillage.getState())).unlockedStep, 1, "progress persists");

    await page.locator('[data-step="1"]').click();
    for (let index = 1; index < 6; index += 1) {
      const solution = await page.evaluate((step) => window.__sqlVillage.lessons[step].solution, index);
      await setEditor(page, solution);
      await page.locator("#run-query").click();
      await page.getByText("မှန်ပါတယ်!").waitFor();
      if (index < 5) await page.locator("#next-step").click();
    }

    assert.equal((await page.evaluate(() => window.__sqlVillage.getState())).complete, true);
    await page.locator("#show-finish").click();
    await page.getByText("တရားခံက Nandar Hlaing ပါ!").waitFor();

    await page.locator("#open-schema").click();
    assert.equal(await page.locator("#schema-dialog").evaluate((dialog) => dialog.open), true);
    await page.locator("#close-schema").click();

    await page.locator("#reset-case").click();
    await page.waitForFunction(() => window.__sqlVillage.getState().unlockedStep === 0);
    assert.equal((await page.evaluate(() => window.__sqlVillage.getState())).complete, false);

    await page.setViewportSize({ width: 375, height: 812 });
    assert.equal(await page.locator("#mobile-progress").isVisible(), true);
    assert.equal(await page.locator("#lesson-card").isVisible(), true);

    await page.emulateMedia({ reducedMotion: "reduce" });
    const motionDuration = await page.locator("#start-case").evaluate((element) => getComputedStyle(element).transitionDuration);
    assert.ok(["0s", "0.00001s", "1e-05s"].includes(motionDuration), `reduced motion duration was ${motionDuration}`);
    assert.deepEqual(browserErrors, [], `browser errors: ${browserErrors.join(" | ")}`);

    console.log("✓ browser lesson flow");
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
}

async function verifyArtifacts() {
  for (const file of [
    "css/app.css",
    "schema.png",
    "sql-village-worksheet.pdf",
    "sql-village-teacher-guide.pdf",
    "scripts/vendor/sql-wasm.wasm"
  ]) {
    const stats = await fs.stat(path.join(root, file));
    assert.ok(stats.size > 1000, `${file} should be a non-empty built artifact`);
  }

  const html = await fs.readFile(path.join(root, "index.html"), "utf8");
  assert.doesNotMatch(html, /googletagmanager|cdn\.jsdelivr|unpkg\.com|cdnjs\.cloudflare/i);
  console.log("✓ local production artifacts");
}

await verifyDatabase();
await verifyArtifacts();
await verifyBrowser();
console.log("All checks passed.");
