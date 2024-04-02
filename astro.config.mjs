import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import partytown from "@astrojs/partytown";
import svelte from "@astrojs/svelte";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  // Enable many frameworks to support all different kinds of components.
  // No `include` is needed if you are only using a single JSX framework!
  site: 'https://bartyspacelabs.netlify.app/',
  integrations: [
    tailwind(), 
    react(), 
    partytown({
      config: {
        forward: ["dataLayer.push"]
      }
    }), 
    svelte(), 
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date('2022-02-24'),
    }),]
});