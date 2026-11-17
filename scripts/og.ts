/**
 * Render Open Graph images (1200×630 PNG, light theme) with satori + resvg.
 *
 *   bun run og            render images that are missing or older than their post
 *   bun run og --force    render everything
 *
 * Posts come from `src/content/blog/<lang>/*.mdx` (drafts are skipped). Output goes to
 * `public/og/<lang>/<slug>.png`, plus `public/og/default.png` for every other page.
 * Images are committed so the site build never needs this script.
 */
import { mkdir, readdir, readFile, stat, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parse as parseYaml } from "yaml";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";

const force = process.argv.includes("--force");
const BLOG_DIR = "src/content/blog";
const OUT_DIR = "public/og";

// Light theme tokens (src/styles/global.css)
const C = {
  bg: "#fafaf8",
  text: "#1a1a18",
  muted: "#6b6b65",
  accent: "#d97706",
  accentBg: "#fef3c7",
};

const font = (pkg: string, file: string) => readFile(`node_modules/@fontsource/${pkg}/files/${file}`);
const cjkDir = "node_modules/@fontsource/noto-sans-sc/files";
const cjkSlices = (await readdir(cjkDir)).filter((f) => f.endsWith("-600-normal.woff") && !f.includes("latin"));

type Font = NonNullable<Parameters<typeof satori>[1]["fonts"]>[number];
const fonts: Font[] = [
  { name: "Inter", data: await font("inter", "inter-latin-600-normal.woff"), weight: 600, style: "normal" },
  { name: "Inter", data: await font("inter", "inter-latin-400-normal.woff"), weight: 400, style: "normal" },
  { name: "JetBrains Mono", data: await font("jetbrains-mono", "jetbrains-mono-latin-400-normal.woff"), weight: 400, style: "normal" },
  // CJK glyphs: satori falls back through these per character
  ...(await Promise.all(
    cjkSlices.map(async (f, i): Promise<Font> => ({
      name: `Noto Sans SC ${i}`,
      data: await readFile(join(cjkDir, f)),
      weight: 600,
      style: "normal",
    })),
  )),
];

// Each slice has its own family name so satori can fall back through them glyph by glyph
const FAMILY = ["Inter", ...cjkSlices.map((_, i) => `Noto Sans SC ${i}`)].map((f) => `'${f}'`).join(", ");

type Node = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Record<string, unknown>, children?: unknown): Node => ({
  type,
  props: { style: { display: "flex", ...style }, children },
});

/** Trim to ~140 chars at a word boundary (CJK has no spaces, so it just cuts). */
const clip = (text: string, max = 140) =>
  text.length <= max ? text : `${text.slice(0, max).replace(/\s+\S*$/, "")}…`;

function card(opts: { title: string; description?: string; tags?: string[]; meta: string }): Node {
  const { title, description, tags = [], meta } = opts;
  const titleSize = title.length > 60 ? 56 : title.length > 36 ? 64 : 80;
  return h(
    "div",
    {
      width: "100%",
      height: "100%",
      flexDirection: "column",
      justifyContent: "space-between",
      background: C.bg,
      padding: "64px 72px",
      fontFamily: FAMILY,
      boxSizing: "border-box",
      color: C.text,
      borderTop: `12px solid ${C.accent}`,
    },
    [
      h("div", { alignItems: "center", gap: 14, fontFamily: "JetBrains Mono", fontSize: 28, color: C.muted }, [
        h("div", { width: 14, height: 14, borderRadius: 7, background: C.accent }),
        h("div", {}, "arldka.cloud"),
      ]),
      h("div", { flexDirection: "column", gap: 28 }, [
        h("div", { fontSize: titleSize, fontWeight: 600, maxWidth: 1056, flexWrap: "wrap", lineHeight: 1.12, letterSpacing: -1.5 }, title),
        description
          ? h(
              "div",
              { fontSize: 30, fontWeight: 400, lineHeight: 1.4, color: C.muted, maxWidth: 980 },
              clip(description),
            )
          : h("div", {}),
      ]),
      h("div", { alignItems: "center", justifyContent: "space-between" }, [
        h(
          "div",
          { gap: 12 },
          tags
            .slice(0, 5)
            .map((t) =>
              h("div", { fontFamily: "JetBrains Mono", fontSize: 24, color: C.accent, background: C.accentBg, padding: "6px 16px", borderRadius: 8 }, t),
            ),
        ),
        h("div", { fontSize: 26, color: C.muted }, meta),
      ]),
    ],
  );
}

async function png(node: Node): Promise<Buffer> {
  const svg = await satori(node as never, { width: 1200, height: 630, fonts });
  return Buffer.from(new Resvg(svg, { fitTo: { mode: "width", value: 1200 } }).render().asPng());
}

async function mtime(path: string) {
  try {
    return (await stat(path)).mtimeMs;
  } catch {
    return 0;
  }
}

async function write(out: string, source: string | null, node: () => Node): Promise<"rendered" | "skipped"> {
  // Re-render when the post (or this script) is newer than the image
  const newest = Math.max(source ? await mtime(source) : 0, await mtime(fileURLToPath(import.meta.url)));
  if (!force && (await mtime(out)) > newest) return "skipped";
  await mkdir(dirname(out), { recursive: true });
  await writeFile(out, await png(node()));
  console.log(`✓ ${source ?? "default"} → ${out}`);
  return "rendered";
}

const counts = { rendered: 0, skipped: 0 };

counts[
  await write(join(OUT_DIR, "default.png"), null, () =>
    card({
      title: "Arthur Laurent",
      description: "DevOps / Platform Engineer. Kubernetes, homelab and infrastructure notes.",
      tags: ["kubernetes", "homelab", "devops"],
      meta: "arldka.cloud",
    }),
  )
]++;

for (const lang of await readdir(BLOG_DIR)) {
  for (const file of await readdir(join(BLOG_DIR, lang))) {
    if (!/\.mdx?$/.test(file)) continue;
    const path = join(BLOG_DIR, lang, file);
    const front = (await readFile(path, "utf8")).match(/^---\n([\s\S]*?)\n---/)?.[1];
    if (!front) continue;
    const data = parseYaml(front) as {
      title: string;
      description?: string;
      tags?: string[];
      pubDate: string | Date;
      draft?: boolean;
    };
    if (data.draft) continue;

    const date = new Date(data.pubDate).toLocaleDateString(lang === "zh-CN" ? "zh-CN" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const slug = file.replace(/\.mdx?$/, "");
    counts[
      await write(join(OUT_DIR, lang, `${slug}.png`), path, () =>
        card({ title: data.title, description: data.description, tags: data.tags, meta: date }),
      )
    ]++;
  }
}

console.log(`\n${counts.rendered} rendered, ${counts.skipped} up to date`);
