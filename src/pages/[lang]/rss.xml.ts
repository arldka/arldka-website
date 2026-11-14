import rss from "@astrojs/rss";
import type { APIContext, GetStaticPaths } from "astro";
import { getRelativeLocaleUrl } from "astro:i18n";
import { getPostsByLang, splitId } from "@/lib/blog";
import { languages, type Lang } from "@/i18n/ui";

export const getStaticPaths = (() =>
  (Object.keys(languages) as Lang[]).map((lang) => ({ params: { lang } }))) satisfies GetStaticPaths;

export async function GET(context: APIContext) {
  const lang = context.params.lang as Lang;
  const posts = await getPostsByLang(lang);
  return rss({
    title: "arldka",
    description: "Arthur Laurent — DevOps / Platform Engineer",
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: getRelativeLocaleUrl(lang, `/blog/${splitId(post.id).slug}`, { normalizeLocale: false }),
    })),
    customData: `<language>${lang}</language>`,
  });
}
