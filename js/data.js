// ── Data Layer ─────────────────────────────────────────────
// Loads and caches JSON content files

const DataStore = (() => {
  const cache = {};

  async function load(name) {
    if (cache[name]) return cache[name];
    const resp = await fetch(`./data/${name}.json`);
    if (!resp.ok) throw new Error(`Failed to load ${name}.json`);
    cache[name] = await resp.json();
    return cache[name];
  }

  async function getParables() { return load('parables'); }
  async function getMiracles() { return load('miracles'); }

  return { getParables, getMiracles };
})();
