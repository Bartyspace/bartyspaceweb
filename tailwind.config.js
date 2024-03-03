/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./node_modules/flowbite/**/*.js",
  ],
  darkMode: "false",
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "0.875rem",
          sm: "1.125rem",
          md: "1.125rem",
          lg: "0.625rem",
          xl: "0.625rem",
          "2xl": "0.625rem",
        },
        screens: {
          sm: "100%",
          md: "100%",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1580px",
          
        },
      },
    },
  },
  plugins: [require("flowbite/plugin"), require("tailwindcss-animated")],
};
