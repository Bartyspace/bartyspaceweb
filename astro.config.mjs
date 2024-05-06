import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import partytown from '@astrojs/partytown';
import sitemap from '@astrojs/sitemap';

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: 'https://bartyspacelabs.netlify.app/',
  trailingSlash: 'never',
  integrations: [tailwind({
    nesting: true
  }), partytown({
    config: {
      forward: ['dataLayer.push']
    }
  }), sitemap({
    changefreq: 'weekly',
    priority: 0.7,
    lastmod: new Date('2022-02-24')
  }), icon()]
});