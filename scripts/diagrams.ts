/**
 * Render diagram sources to static SVGs with Kroki (https://kroki.io).
 *
 *   bun run diagrams            render sources that changed since their last render
 *   bun run diagrams --force    render everything
 *
 * Sources live in `diagrams/<lang>/<post-slug>/` (any depth works). The diagram
 * type comes from the file extension (see TYPES). Output goes to
 * `src/assets/diagrams/`, mirroring the folder structure, and is committed so the
 * site build never needs the network.
 *
 * Note: the diagram source is sent to the public kroki.io service.
 */
import { mkdir, readdir, readFile, stat, writeFile } from "node:fs/promises";
import { dirname, extname, join, relative } from "node:path";

const KROKI_URL = process.env.KROKI_URL ?? "https://kroki.io";

/** File extension -> Kroki diagram type. */
const TYPES: Record<string, string> = {
  ".d2": "d2",
  ".mmd": "mermaid",
  ".mermaid": "mermaid",
  ".puml": "plantuml",
  ".plantuml": "plantuml",
  ".dot": "graphviz",
  ".gv": "graphviz",
  ".excalidraw": "excalidraw",
  ".bpmn": "bpmn",
  ".dbml": "dbml",
  ".ditaa": "ditaa",
  ".erd": "erd",
  ".nomnoml": "nomnoml",
  ".pikchr": "pikchr",
  ".svgbob": "svgbob",
  ".wavedrom": "wavedrom",
  ".vega": "vega",
  ".vl": "vegalite",
  ".seqdiag": "seqdiag",
  ".blockdiag": "blockdiag",
  ".nwdiag": "nwdiag",
  ".actdiag": "actdiag",
  ".packetdiag": "packetdiag",
  ".rackdiag": "rackdiag",
  ".bytefield": "bytefield",
  ".c4": "c4plantuml",
  ".structurizr": "structurizr",
  ".tikz": "tikz",
  ".umlet": "umlet",
  ".wireviz": "wireviz",
  ".symbolator": "symbolator",
};

const args = process.argv.slice(2);
const force = args.includes("--force");
const opt = (name: string, fallback: string) => {
  const i = args.indexOf(name);
  return i !== -1 && args[i + 1] ? args[i + 1] : fallback;
};
const SRC_DIR = opt("--src", "diagrams");
const OUT_DIR = opt("--out", "src/assets/diagrams");

async function* walk(dir: string): AsyncGenerator<string> {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else yield path;
  }
}

async function mtime(path: string) {
  try {
    return (await stat(path)).mtimeMs;
  } catch {
    return 0;
  }
}

/** Centre the drawing in whatever box it is shown in (D2 defaults to top-left). */
function centre(svg: string): string {
  return svg.replace(/<svg\b[^>]*>/, (root) =>
    /preserveAspectRatio=/.test(root)
      ? root.replace(/preserveAspectRatio="[^"]*"/, 'preserveAspectRatio="xMidYMid meet"')
      : root.replace(/>$/, ' preserveAspectRatio="xMidYMid meet">'),
  );
}

async function render(type: string, source: string): Promise<string> {
  const res = await fetch(`${KROKI_URL}/${type}/svg`, {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: source,
    signal: AbortSignal.timeout(30_000),
  });
  const body = await res.text();
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}\n${body.trim()}`);
  return centre(body);
}

let rendered = 0;
let skipped = 0;
let failed = 0;

for await (const file of walk(SRC_DIR)) {
  const type = TYPES[extname(file).toLowerCase()];
  if (!type) continue; // README, notes, etc.

  const out = join(OUT_DIR, relative(SRC_DIR, file)).replace(/\.[^.]+$/, ".svg");

  if (!force && (await mtime(out)) > (await mtime(file))) {
    skipped++;
    continue;
  }

  try {
    const svg = await render(type, await readFile(file, "utf8"));
    await mkdir(dirname(out), { recursive: true });
    await writeFile(out, svg.endsWith("\n") ? svg : `${svg}\n`);
    console.log(`✓ ${file} → ${out}`);
    rendered++;
  } catch (err) {
    console.error(`✗ ${file} (${type})\n  ${(err as Error).message.replaceAll("\n", "\n  ")}`);
    failed++;
  }
}

console.log(`\n${rendered} rendered, ${skipped} up to date${failed ? `, ${failed} failed` : ""}`);
if (failed) process.exit(1);
