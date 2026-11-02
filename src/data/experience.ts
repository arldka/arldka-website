export interface Experience {
  role: { en: string; "zh-CN": string };
  company: string;
  period: string;
  description: { en: string[]; "zh-CN": string[] };
  tags: string[];
}

export const experiences: Experience[] = [
  {
    role: { en: "Senior DevOps", "zh-CN": "DevOps / 平台工程师" },
    company: "BforBank (Credit Agricole Group)",
    period: "Feb 2024 — Aug 2025",
    description: {
      en: [
        "Automated the upgrade and stability certification of the bank's self-managed GitLab, removing downtime from the upgrade cycle.",
        "Built a self-service GitLab CI/CD catalog used by 12 development teams across Java, Python, Node.js and Go.",
        "Rolled out RenovateBot across ~800 repositories to keep internal dependencies up to date.",
        "Refactored infrastructure pipeline templating so every environment is generated from a single repository.",
        "Led infrastructure and CI/CD failure scenarios in company-wide GameDays to test incident response and expose weaknesses.",
        "Contributed upstream to GitLab (Cloud Storage encryption fix for self-managed installations) and RenovateBot (global Maven dependency support).",
      ],
      "zh-CN": [
        "自动化银行自托管 GitLab 的升级和稳定性认证，消除升级周期中的停机时间。",
        "构建了被 12 个开发团队（Java、Python、Node.js、Go）使用的自助式 GitLab CI/CD 目录。",
        "在约 800 个代码仓库中推广 RenovateBot，保持内部依赖项的持续更新。",
        "重构基础设施流水线模板，使每个环境都从单一代码仓库生成。",
        "在全公司 GameDay 演练中主导基础设施和 CI/CD 故障场景，测试事故响应并发现薄弱环节。",
        "向 GitLab 和 RenovateBot 贡献上游代码（云存储加密修复和 Maven 全局依赖支持）。",
      ],
    },
    tags: ["Google Cloud", "Kubernetes", "Gitlab CI/CD", "FluxCD", "Google Config Conncetor", "Crossplane", "Terraform", "Go", "Bash"],
  },
  {
    role: { en: "Senior Cloud Engineer", "zh-CN": "基础设施工程师" },
    company: "Devoteam Google Cloud Partner",
    period: "Feb 2021 — Nov 2023",
    description: {
      en: [
        "Rebuilt the GCP and Kubernetes architecture of a major French e-commerce company and led the migration of all its services to new GKE clusters and a service mesh.",
        "Designed and implemented Kubernetes landing zones on Google Cloud for clients, leading the architecture workshops.",
        "Designed a disaster recovery plan (RTO 1 day, RPO 1 hour) that enabled a startup client's ISO 27001 certification.",
        "Trained 100+ engineers as a Google Cloud and Linux Foundation authorized trainer.",
        "Built open-source tooling to manage private Terraform module registries, and worked with Sales and Pre-Sales on the service catalog.",
      ],
      "zh-CN": [
        "重建了法国某大型电商公司的 GCP 和 Kubernetes 架构，并主导将其所有服务迁移到新的 GKE 集群和服务网格。",
        "为客户设计和实施 Google Cloud 上的 Kubernetes 落地区，主持架构研讨会。",
        "设计灾难恢复计划（RTO 1 天，RPO 1 小时），助力初创客户通过 ISO 27001 认证。",
        "作为 Google Cloud 和 Linux Foundation 授权讲师，培训了 100 余名工程师。",
        "构建用于管理私有 Terraform 模块注册中心的开源工具，并参与售前服务目录工作。",
      ],
    },
    tags: ["Google Cloud", "GKE", "Terraform", "ArgoCD", "Istio", "LinkerD", "Kyverno", "Traefik", "Prometheus", "Grafana", "ELK"],
  },
];
