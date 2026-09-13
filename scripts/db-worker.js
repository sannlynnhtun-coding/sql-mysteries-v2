importScripts("vendor/sql-wasm.js");

let database = null;
const sqlReady = initSqlJs({ locateFile: (file) => `vendor/${file}` });

self.onmessage = async ({ data }) => {
  const { id, action } = data;

  try {
    const SQL = await sqlReady;

    if (action === "open") {
      if (database) database.close();
      database = new SQL.Database(new Uint8Array(data.buffer));
      self.postMessage({ id, ready: true });
      return;
    }

    if (action === "exec") {
      if (!database) throw new Error("Database ကို မဖွင့်ရသေးပါ။");
      self.postMessage({ id, results: database.exec(data.sql) });
      return;
    }

    throw new Error(`Unknown database action: ${action}`);
  } catch (error) {
    self.postMessage({
      id,
      error: error instanceof Error ? error.message : String(error)
    });
  }
};
