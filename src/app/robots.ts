import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/post/*/edit', '/post/create'],
    },
    sitemap: `https://windowoon.dev/sitemap.xml`,
  };
}
