import { getCollection, type CollectionEntry } from "astro:content";
import { languages, type Lang } from "@/i18n/ui";

export type Post = CollectionEntry<"blog">;

/** Split a post id like "zh-CN/hello-world" into its locale and slug. */
export function splitId(id: string): { lang: Lang; slug: string } {
  const [dir, ...rest] = id.split("/");
  if (!(dir in languages)) throw new Error(`Blog post "${id}" is not inside a locale folder`);
  return { lang: dir as Lang, slug: rest.join("/") };
}

/** Published posts for a locale, newest first. */
export async function getPostsByLang(lang: Lang): Promise<Post[]> {
  const posts = await getCollection("blog", ({ id, data }) => id.startsWith(`${lang}/`) && !data.draft);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}
