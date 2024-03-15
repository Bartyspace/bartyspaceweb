import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  // Enable many frameworks to support all different kinds of components.
  // No `include` is needed if you are only using a single JSX framework!
  integrations: [tailwind(), react()]
});