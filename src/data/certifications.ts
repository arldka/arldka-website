export interface Certification {
  name: { en: string; "zh-CN": string };
  active: boolean;
}

export const certifications: Certification[] = [
  {
    name: { en: "Google Cloud Professional Cloud Architect", "zh-CN": "Google Cloud 专业云架构师" },
    active: true,
  },
  {
    name: { en: "Google Cloud Professional Cloud Security Engineer", "zh-CN": "Google Cloud 专业云安全工程师" },
    active: true,
  },
  {
    name: { en: "Google Cloud Platform Authorized Trainer", "zh-CN": "Google Cloud 平台授权讲师" },
    active: false,
  },
  {
    name: { en: "Certified Kubernetes Application Developer (CKAD)", "zh-CN": "Kubernetes 应用开发者认证 (CKAD)" },
    active: true,
  },
  {
    name: { en: "Linux Foundation LFD459 Authorized Trainer", "zh-CN": "Linux Foundation LFD459 授权讲师" },
    active: false,
  },
  {
    name: { en: "AWS Solutions Architect — Professional", "zh-CN": "AWS 解决方案架构师 — 专业级" },
    active: true,
  },
];
