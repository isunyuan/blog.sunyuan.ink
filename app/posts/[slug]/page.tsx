import { notFound } from 'next/navigation'
import { getPostBySlug, getAdjacentPosts } from '@/lib/markdown'
import PostContent from '@/components/PostContent'
import { SITE_CONFIG } from '@/app/layout'

type Props = {
	params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
	const { slug } = await params
	const post = await getPostBySlug(slug)
	if (!post) return { title: '页面不存在' }
	return {
		title: `${post.title}`,
	}
}

export default async function PostPage({ params }: Props) {
	const { slug } = await params
	const post = await getPostBySlug(slug)
	if (!post) notFound()

	const { prevPost, nextPost } = await getAdjacentPosts(slug)

	return (
		<PostContent
			post={post}
			prevPost={prevPost}
			nextPost={nextPost}
		/>
	)
}
