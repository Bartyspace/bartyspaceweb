/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./node_modules/flowbite/**/*.js",
  ],
  darkMode: "false",
  theme: {
    extend: {
      screens: {         
        'xxl': '1440px',       
                },     
    },
  },
  plugins: [require("flowbite/plugin"), require("tailwindcss-animated")],
};
