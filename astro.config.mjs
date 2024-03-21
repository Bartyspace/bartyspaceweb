import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import partytown from "@astrojs/partytown";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  // Enable many frameworks to support all different kinds of components.
  // No `include` is needed if you are only using a single JSX framework!
  site: 'https://snazzy-capybara-a7228d.netlify.app/',
  integrations: [tailwind(), react(), partytown({
    config: {
      forward: ["dataLayer.push"]
    }
  }), svelte()]
});