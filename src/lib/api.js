export async function fetchJson(url, options = {}) {
  const response = await fetch(url, options);
  const raw = await response.text();
  let body = {};
  try {
    body = raw ? JSON.parse(raw) : {};
  } catch (err) {
    body = { raw };
  }
  return { ok: response.ok, status: response.status, body };
}
