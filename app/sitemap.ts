import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/markdown' 

const SITE_URL = 'http://blog.sunyuan.ink'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const staticRoutes: MetadataRoute.Sitemap = [
		{
			url: SITE_URL,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 1,
		},
	]

	const allPosts = await getAllPosts()

	const postRoutes: MetadataRoute.Sitemap = allPosts.map((post) => ({
		url: `${SITE_URL}/posts/${post.slug}`,
		lastModified: new Date(post.date),
		changeFrequency: 'weekly',
		priority: 0.7,
	}))

	return [...staticRoutes, ...postRoutes]
}
