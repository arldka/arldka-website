import { defineConfig, fontProviders } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://arldka.cloud",
  output: "static",
  integrations: [
    mdx(),
    sitemap({
      // "/" is only a redirect to "/en/"
      filter: (page) => page !== "https://arldka.cloud/",
      i18n: {
        defaultLocale: "en",
        locales: { en: "en", "zh-CN": "zh-CN" },
      },
    }),
  ],
  i18n: {
    defaultLocale: "en",
    locales: ["en", "zh-CN"],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true,
    },
  },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Inter",
      cssVariable: "--font-inter",
      weights: ["100 900"],
      styles: ["normal"],
      fallbacks: ["system-ui", "sans-serif"],
    },
    {
      provider: fontProviders.fontsource(),
      name: "JetBrains Mono",
      cssVariable: "--font-jetbrains",
      weights: ["100 800"],
      styles: ["normal"],
      fallbacks: ["ui-monospace", "monospace"],
    },
  ],
});
