import { MetadataRoute } from 'next';
import { getAllPosts } from '@/features/post/lib';

const defaultSiteMap: MetadataRoute.Sitemap = [
  {
    url: `https://windowoon.dev`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1.0,
  },
  {
    url: `https://windowoon.dev/post`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();

  const postsSiteMap: MetadataRoute.Sitemap = posts.map(post => {
    return {
      url: `https://windowoon.dev/post/${post.id}/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: 'weekly',
      priority: 0.8,
    };
  });

  return [...defaultSiteMap, ...postsSiteMap];
}
