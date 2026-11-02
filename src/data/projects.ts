export type ProjectStatus = "active" | "inactive" | "archived";
export type ProjectOpenness = "open-source" | "open-core" | "closed-source";
export type ContributionRole = "contributor" | "maintainer" | "reviewer";

export interface Project {
  name: string;
  description: { en: string; "zh-CN": string };
  tags: string[];
  status: ProjectStatus;
  openness?: ProjectOpenness;
  wip?: boolean;
  featured?: boolean;
  source?: string;
  site?: string;
}

export interface ContributedProject {
  name: string;
  description: { en: string; "zh-CN": string };
  role: ContributionRole;
  tags: string[];
  source?: string;
  site?: string;
}

export const projects: Project[] = [
  {
    name: "arldka-website",
    description: {
      en: "This site. Personal portfolio built with Astro v7, static, bilingual (EN/ZH-CN), deployed on Cloudflare Pages.",
      "zh-CN": "本站。使用 Astro v7 构建的个人作品集，静态双语（英文/中文），部署在 Cloudflare Pages。",
    },
    tags: ["Astro", "TypeScript", "Cloudflare Pages"],
    status: "active",
    openness: "open-source",
    wip: true,
    source: "https://github.com/arldka/arldka-website",
  },
  {
    name: "kubernetes-homelab",
    description: {
      en: "Infrastructure-as-code for my Talos homelab Kubernetes cluster. Flux, Cilium, POCs and associated automation.",
      "zh-CN": "我的家庭实验室在Talos Linux上运行 Kubernetes 集群的基础设施即代码，涵盖 Flux、Cilium、POC 及相关自动化。",
    },
    tags: ["Kubernetes", "FluxCD", "Cilium", "Terraform"],
    status: "active",
    wip: true,
    source: "https://github.com/arldka/kubernetes-homelab",
  },
  {
    name: "kubenoir",
    description: {
      en: "A browser-based, open-source detective game where you play a 1940s-style noir investigator and debug simulated Kubernetes incidents from a web terminal, using a Rust/WASM engine that runs a simulated cluster in your browser.",
      "zh-CN": "一款基于浏览器的开源侦探游戏，你扮演一位1940年代黑色电影风格的侦探调查员，通过网页终端调试模拟的Kubernetes事件，使用Rust/WASM引擎在浏览器中运行模拟集群。"
    },
    tags: ["Rust", "WASM" ,"SvelteKit", "Tailwind CSS"],
    status: "active",
    wip: true,
    source: "https://github.com/arldka/kubenoir"
  },
  {
    name: "Petra",
    description: {
      en: "Petra is a lightweight tool that allows to host your own private Terraform / OpenTofu module registry through a stateless proxy using Google Cloud Storage as a storage backend.",
      "zh-CN": "Petra 是一个轻量级工具，可以通过无状态代理来托管你自己的私有 Terraform / OpenTofu 模块注册表，并使用 Google Cloud Storage 作为存储后端。",
    },
    tags: ["Go", "Google Cloud", "GCS", "Terraform", "OpenTofu"],
    status: "inactive",
    openness: "open-source",
    source: "https://github.com/devoteamgcloud/petra",
  },
  {
    name: "helm-charts",
    description: {
      en: "A compilation of helm-charts I used to maintain mainly prometheus-operator and prometheus-operated to simplify the installation and upgrade process of the prometheus-operator and instances managed by the prometheus operator without any additional bloat.",
      "zh-CN": "我维护的 Helm Chart 集合，主要面向 prometheus-operator 和 prometheus-operated，用于简化 prometheus-operator 及其所管理实例的安装与升级流程，不引入任何额外冗余。"
    },
    tags: ["Helm Chart", "Helm", "artifacthub", "prometheus", "prometheus-operator"],
    status: "inactive",
    openness: "open-source",
    source: "https://github.com/arldka/helm-charts"
  },
  {
    name: "flammkuchen",
    description: {
      en: "Flammkuchen is an open source FluxCD UI that aims to replace the main use-cases that were previously covered Flamingo which is now inactive / no longer maintained. The project aims to be simple enough with a limited set of core-features as to be easily maintainable / reusable for other usecases.",
      "zh-CN": "Flammkuchen 是一个开源的 FluxCD UI，旨在替代 Flamingo 此前覆盖的主要使用场景——Flamingo 现已停止维护。该项目刻意保持简洁，仅提供有限的核心功能，以便于维护并复用于其他场景。"
    },
    tags: ["Go", "fluxcd", "Kubernetes", "GitOps"],
    status: "archived",
    openness: "open-source",
    source: "https://github.com/arldka/flammkuchen"
  },
  {
    name: "artifacthub-gchat-updates",
    description: {
      en: "A simple Go webhook that handles ArtifactHub Webhooks and relays them to a Google Chat space.",
      "zh-CN": "一个轻量的 Go Webhook，用于接收 ArtifactHub Webhook 并转发至 Google Chat 空间。",
    },
    tags: ["Go", "artifacthub"],
    status: "archived",
    openness: "open-source",
    source: "https://github.com/arldka/artifacthub-gchat-updates"
  },
  {
    name: "github_gchat_rss_notifications",
    description: {
      en: "Google Chat Bot for Github Releases Notifications. ",
      "zh-CN": "用于 GitHub Release 通知的 Google Chat 机器人。",
    },
    tags: ["Go", "Github"],
    status: "archived",
    openness: "open-source",
    source: "https://github.com/arldka/github_gchat_rss_notifications"
  }
];

export const contributedProjects: ContributedProject[] = [
  {
    name: "GitLab Chart",
    description: {
      en: "Contributed upstream to Gitlab for Google Cloud Storage encryption for self-managed installations.",
      "zh-CN": "向上游 GitLab 贡献代码，为自托管实例支持 Google Cloud Storage 加密功能。",
    },
    tags: ["Helm", "Gitlab CI/CD", "Google Cloud"],
    source: "https://gitlab.com/gitlab-org/charts/gitlab",
    role: "contributor",
  },
  {
    name: "RenovateBot",
    description: {
      en: "Proposed changes to support global user level .m2 folder settings.xml for Maven/Gradle dependency support. ",
      "zh-CN": "提出改动方案，以支持全局用户级别的 .m2 文件夹 settings.xml，用于 Maven/Gradle 依赖支持。",
    },
    tags: ["Typescript", "Java"],
    source: "https://github.com/renovatebot/renovate",
    role: "contributor"
  },
];
