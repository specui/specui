import { getAllDirectories } from '@/utils/getAllDirectories';
import type { MetadataRoute } from 'next';

const host = 'https://specui.org';

export default function sitemap(): MetadataRoute.Sitemap {
  const directories = getAllDirectories('./app/docs').map((dir) => dir.slice(3));

  return [
    {
      url: `${host}/`,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${host}/playground`,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${host}/generators`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${host}/features`,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${host}/docs`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...directories.map(
      (dir) =>
        ({
          url: `${host}${dir}`,
          changeFrequency: 'weekly',
          priority: 0.75,
        }) as MetadataRoute.Sitemap[number],
    ),
  ];
}
