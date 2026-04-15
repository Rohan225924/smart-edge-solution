import { MetadataRoute } from 'next';
import { getPosts, getServices } from '@/lib/db';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://smartedgesolution.com';

  const staticPages = [
    { url: baseUrl, priority: 1 },
    { url: `${baseUrl}/about`, priority: 0.8 },
    { url: `${baseUrl}/services`, priority: 0.9 },
    { url: `${baseUrl}/blog`, priority: 0.8 },
    { url: `${baseUrl}/contact`, priority: 0.7 },
  ];

  const posts = getPosts().filter(p => p.status === 'published');
  const postUrls = posts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const services = getServices();
  const serviceUrls = services.map(service => ({
    url: `${baseUrl}/services`,
    lastModified: new Date(service.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...postUrls, ...serviceUrls];
}