// Runs only for "/" (see assets.run_worker_first in wrangler.jsonc).
// Everything else is served straight from static assets.

function pickLocale(header: string | null): "en" | "zh-CN" {
  if (!header) return "en";
  const prefs = header
    .split(",")
    .map((p) => {
      const [tag, q] = p.trim().split(";q=");
      return { tag: tag.toLowerCase(), q: q ? parseFloat(q) : 1 };
    })
    .filter((p) => p.q > 0)
    .sort((a, b) => b.q - a.q);

  for (const { tag } of prefs) {
    if (tag === "zh" || tag.startsWith("zh-")) return "zh-CN";
    if (tag === "en" || tag.startsWith("en-")) return "en";
  }
  return "en";
}

export default {
  async fetch(request: Request): Promise<Response> {
    const locale = pickLocale(request.headers.get("Accept-Language"));
    return new Response(null, {
      status: 302,
      headers: {
        Location: new URL(`/${locale}/`, request.url).href,
        Vary: "Accept-Language",
      },
    });
  },
};
