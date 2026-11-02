export const languages = {
  en: "English",
  "zh-CN": "中文",
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = "en";

export const ui = {
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.blog": "Blog",
    "nav.memo": "Memo",
    "nav.switchLang": "中文",

    "footer.rights": "All rights reserved.",
    "footer.builtWith": "Built with Astro",

    "home.tagline": "DevOps / Platform Engineer",
    "home.certBadges": "GCP · Kubernetes · AWS Certified",
    "home.nowHeading": "What I'm working on",
    "home.now": "Scaling platform infrastructure on Kubernetes, building homelab automation pipelines, and exploring observability tooling.",
    "home.featuredProjectsHeading": "Featured Projects",
    "home.featuredPostsHeading": "Latest Posts",
    "home.viewAll": "View all →",

    "about.heading": "About",
    "about.experienceHeading": "Experience",
    "about.certsHeading": "Certifications",
    "about.bio": "I'm Arthur Laurent, a DevOps and Platform Engineer based in France. I work with Kubernetes, GCP, and AWS to build reliable, scalable infrastructure. I'm passionate about automation, open-source tooling, and running things at home before running them in production.",

    "projects.heading": "Projects",
    "projects.contributedHeading": "Contributions",
    "projects.viewSource": "Source",
    "projects.visitSite": "Visit",
    "projects.status.active": "Active",
    "projects.status.inactive": "Inactive",
    "projects.status.archived": "Archived",
    "projects.openness.open-source": "Open Source",
    "projects.openness.open-core": "Open Core",
    "projects.openness.closed-source": "Closed Source",
    "projects.wip": "WIP",
    "projects.role.contributor": "Contributor",
    "projects.role.maintainer": "Maintainer",
    "projects.role.reviewer": "Reviewer",

    "blog.heading": "Blog",
    "blog.readMore": "Read more",
    "blog.backToList": "← All posts",
    "blog.empty": "No posts yet.",
    "blog.updated": "Updated",

    "404.heading": "Page not found",
    "404.back": "Back to home",
  },
  "zh-CN": {
    "nav.home": "首页",
    "nav.about": "关于",
    "nav.projects": "项目",
    "nav.blog": "博客",
    "nav.memo": "备忘录",
    "nav.switchLang": "EN",

    "footer.rights": "保留所有权利。",
    "footer.builtWith": "由 Astro 构建",

    "home.tagline": "DevOps / 平台工程师",
    "home.certBadges": "GCP · Kubernetes · AWS 认证",
    "home.nowHeading": "近期在做",
    "home.now": "在 Kubernetes 上扩展平台基础设施，构建家庭实验室自动化流水线，以及探索可观测性工具。",
    "home.featuredProjectsHeading": "精选项目",
    "home.featuredPostsHeading": "最新文章",
    "home.viewAll": "查看全部 →",

    "about.heading": "关于",
    "about.experienceHeading": "工作经历",
    "about.certsHeading": "认证",
    "about.bio": "我是 Arthur Laurent，一名驻法国的 DevOps 和平台工程师。我使用 Kubernetes、GCP 和 AWS 构建可靠、可扩展的基础设施。热衷于自动化、开源工具，以及在将事物投入生产之前先在家庭实验室中进行测试。",

    "projects.heading": "项目",
    "projects.contributedHeading": "贡献项目",
    "projects.viewSource": "源代码",
    "projects.visitSite": "访问",
    "projects.status.active": "活跃",
    "projects.status.inactive": "非活跃",
    "projects.status.archived": "已归档",
    "projects.openness.open-source": "开源",
    "projects.openness.open-core": "开放核心",
    "projects.openness.closed-source": "闭源",
    "projects.wip": "开发中",
    "projects.role.contributor": "贡献者",
    "projects.role.maintainer": "维护者",
    "projects.role.reviewer": "审阅者",

    "blog.heading": "博客",
    "blog.readMore": "阅读更多",
    "blog.backToList": "← 所有文章",
    "blog.empty": "暂无文章。",
    "blog.updated": "更新于",

    "404.heading": "页面未找到",
    "404.back": "返回首页",
  },
} as const;

export type UIKey = keyof (typeof ui)[typeof defaultLang];

export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return (ui[lang] as Record<string, string>)[key] ?? (ui[defaultLang] as Record<string, string>)[key] ?? key;
  };
}

export function getAlternateLang(lang: Lang): Lang {
  return lang === "en" ? "zh-CN" : "en";
}

/** Shared `getStaticPaths` for `src/pages/[lang]/*` pages: one page per locale. */
export function localeStaticPaths() {
  return (Object.keys(languages) as Lang[]).map((lang) => ({ params: { lang } }));
}

/** Current locale from the route param (source of truth for `[lang]` pages). */
export function getLang(params: Record<string, string | undefined>, fallback?: string): Lang {
  const lang = params.lang ?? fallback;
  return lang && lang in languages ? (lang as Lang) : defaultLang;
}

/** Pathname without the leading locale segment and surrounding slashes ("/en/blog/" → "blog"). */
export function stripLocale(pathname: string, lang: Lang): string {
  return pathname.slice(`/${lang}`.length).replace(/^\//, "").replace(/\/$/, "");
}

export function formatDate(date: Date, lang: Lang, month: "short" | "long" = "short"): string {
  const locale = lang === "zh-CN" ? "zh-CN" : "en-US";
  return date.toLocaleDateString(locale, { year: "numeric", month, day: "numeric" });
}
