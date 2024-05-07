// Importujeme typ APIRoute z knihovny astro
import type {APIRoute} from 'astro';

// Definujeme pravidla pro robots.txt
const rules = [
  {
    userAgent: '*', // Pravidla platí pro všechny user-agenty
    allow: ['/', '/404'], // Povolujeme přístup na hlavní stránku a stránku 404
    disallow: ['/feed/'] // Zakazujeme přístup na stránku /feed/
  }
];

// Vytváříme URL pro sitemapu
const sitemapUrl = new URL('sitemap-index.xml', import.meta.env.SITE).href;

// Generujeme obsah robots.txt
const robotsTxt = `
${rules
  .map(
    rule => `
User-agent: ${rule.userAgent}
${rule.allow.map(path => `Allow: ${path}`).join('\n')}
${rule.disallow.map(path => `Disallow: ${path}`).join('\n')}
`
  )
  .join('\n')}
Sitemap: ${sitemapUrl}
`.trim();

// Exportujeme GET metodu pro naše API, která vrátí obsah robots.txt
export const GET: APIRoute = () => {
  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8' // Nastavujeme správný content-type
    }
  });
};
