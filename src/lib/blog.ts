import { getCollection, type CollectionEntry } from "astro:content";
import { languages, type Lang } from "@/i18n/ui";

export type Post = CollectionEntry<"blog">;

/** Split a post id like "zh-CN/hello-world" into its locale and slug. */
export function splitId(id: string): { lang: Lang; slug: string } {
  const [dir, ...rest] = id.split("/");
  if (!(dir in languages)) throw new Error(`Blog post "${id}" is not inside a locale folder`);
  return { lang: dir as Lang, slug: rest.join("/") };
}

const CJK = /[㐀-鿿豈-﫿]/g;
const CJK_PER_MIN = 300;
const WORDS_PER_MIN = 220;

/** Estimated reading time in minutes (at least 1), handling both Latin and CJK text. */
export function readingTime(post: Post): number {
  const text = (post.body ?? "")
    .replace(/^(```|~~~)[\s\S]*?^\1/gm, " ") // fenced code blocks
    .replace(/^\s*(import|export)\s.*$/gm, " ") // MDX import/export lines
    .replace(/<[^>]+>/g, " ") // JSX / HTML tags
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1") // links & images -> label
    .replace(/[#>*_`~|-]/g, " "); // markdown punctuation
  const cjk = text.match(CJK)?.length ?? 0;
  const words = text.replace(CJK, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(cjk / CJK_PER_MIN + words / WORDS_PER_MIN));
}

/** Published posts for a locale, newest first. */
export async function getPostsByLang(lang: Lang): Promise<Post[]> {
  const posts = await getCollection("blog", ({ id, data }) => id.startsWith(`${lang}/`) && !data.draft);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}
