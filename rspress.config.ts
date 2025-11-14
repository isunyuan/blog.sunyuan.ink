import * as path from 'node:path';
import { defineConfig } from 'rspress/config';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: "Developer",
  icon: '/banner.png',
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
});
