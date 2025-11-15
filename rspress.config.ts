import * as path from 'node:path';
import { defineConfig } from 'rspress/config';
import sitemap from "rspress-plugin-sitemap";

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: "Developer",
  icon: '/light-dev.png',
  logo: {
    light: '/dark-dev.png',
    dark: '/light-dev.png',
  },
  themeConfig: {
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/isunyuan',
      },
    ],
    enableScrollToTop: true,
  },

  plugins: [
    sitemap({
      domain: "https://blog.sunyuan.ink",
      defaultChangeFreq: "monthly",
      defaultPriority: "0.5",
    }),
  ],
});
