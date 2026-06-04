import { getAllPosts } from '@/lib/markdown'
import { Post } from '@/types/post'
import BlogContent from '@/components/BlogContent'

export default async function Home() {
	const posts: Post[] = await getAllPosts()

	return <BlogContent posts={posts} />
}
