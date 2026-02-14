import { getCollection } from 'astro:content';
import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';

export interface ContentItem {
  tag: string;
  title: string;
  description: string;
  meta: string;
  image: string;
  order: number;
  date: Date;
  href: string;
}

const imageImports = import.meta.glob<{ default: ImageMetadata }>(
  '../../public/assets/img/**/*.{png,jpg,jpeg}'
);

async function resolveImage(imagePath: string) {
  if (!imagePath || imagePath.endsWith('.gif')) return imagePath;
  const srcPath = imagePath.replace('/assets/img/', '../../public/assets/img/');
  const loader = imageImports[srcPath];
  if (!loader) return imagePath;
  const mod = await loader();
  const optimized = await getImage({ src: mod.default, width: 800, format: 'webp' });
  return optimized.src;
}

export async function getSortedPosts(): Promise<ContentItem[]> {
  const posts = await getCollection('blog', ({ data }) => !data.draft);

  const sortedItems = posts
    .map((post) => ({
      tag: post.data.tags?.[0] || 'post',
      title: post.data.title,
      description: post.data.description || '',
      meta: post.data.meta || String(post.data.date.getFullYear()),
      image: post.data.image || '',
      order: post.data.order || 0,
      date: post.data.date,
      href: `/writing/${post.id}`,
    }))
    .sort((a, b) => {
      const aPinned = a.order > 0 ? 1 : 0;
      const bPinned = b.order > 0 ? 1 : 0;
      if (aPinned !== bPinned) return bPinned - aPinned;
      if (aPinned && bPinned) return b.order - a.order;
      return b.date.getTime() - a.date.getTime();
    });

  return Promise.all(
    sortedItems.map(async (item) => ({
      ...item,
      image: await resolveImage(item.image),
    }))
  );
}
