import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeHighlight from 'rehype-highlight'
import rehypeStringify from 'rehype-stringify'
import rehypePrettyCode from 'rehype-pretty-code'
import { Post } from '@/types/post'
import { formatDate } from './date'

/**
 * 文章目录
 */
const postsDirectory = path.join(process.cwd(), 'content/posts')

/**
 * markdown 转 html
 * @param content md 原文
 */
export async function parseMarkdown(content: string): Promise<string> {
	const processor = unified()
		.use(remarkParse)
		.use(remarkGfm)
		.use(remarkRehype, { allowDangerousHtml: true })
		.use(rehypePrettyCode, {
			theme: 'github-light',
		})
		.use(rehypeStringify)

	const file = await processor.process(content)
	return String(file)
}

/**
 * 获取全部文章列表
 */
export async function getAllPosts(): Promise<Post[]> {
	let filenames: string[]
	try {
		filenames = fs.readdirSync(postsDirectory)
	} catch (err) {
		console.warn('posts目录不存在', err)
		return []
	}

	const postPromises = filenames
		.filter((name) => name.endsWith('.md') && !name.startsWith('.'))
		.map(async (filename) => {
			const slug = filename.replace(/\.md$/, '')
			const fullPath = path.join(postsDirectory, filename)
			const fileContent = fs.readFileSync(fullPath, 'utf8')
			const { data, content } = matter(fileContent)
			const html = await parseMarkdown(content)

			const post: Post = {
				slug,
				title: data.title ?? '无标题',
				date: formatDate(data.date ?? new Date()),
				tags: Array.isArray(data.tags) ? data.tags : [],
				excerpt: data.excerpt ?? '',
				content,
				html,
			}
			return post
		})

	const allPosts = await Promise.all(postPromises)

	return allPosts.sort((a, b) => {
		return new Date(b.date).getTime() - new Date(a.date).getTime()
	})
}

/**
 * 通过slug获取单篇文章
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
	try {
		const fullPath = path.join(postsDirectory, `${slug}.md`)
		const fileContent = fs.readFileSync(fullPath, 'utf8')
		const { data, content } = matter(fileContent)
		const html = await parseMarkdown(content)

		return {
			slug,
			title: data.title ?? '无标题',
			date: formatDate(data.date ?? new Date()),
			tags: Array.isArray(data.tags) ? data.tags : [],
			excerpt: data.excerpt ?? '',
			content,
			html,
		}
	} catch {
		return null
	}
}

/**
 * 根据当前 slug 获取 上一篇 / 下一篇 文章（按全局时间排序）
 * @param currentSlug 当前文章 slug
 * @returns prevPost / nextPost，无则为 null
 */
export async function getAdjacentPosts(currentSlug: string): Promise<{
	prevPost: { slug: string; title: string } | null
	nextPost: { slug: string; title: string } | null
}> {
	const allPosts = await getAllPosts()
	const currentIndex = allPosts.findIndex((post) => post.slug === currentSlug)

	if (currentIndex === -1) {
		return { prevPost: null, nextPost: null }
	}

	let prevPost: { slug: string; title: string } | null = null
	let nextPost: { slug: string; title: string } | null = null

	if (currentIndex + 1 < allPosts.length) {
		const p = allPosts[currentIndex + 1]
		prevPost = { slug: p.slug, title: p.title }
	}

	if (currentIndex - 1 >= 0) {
		const p = allPosts[currentIndex - 1]
		nextPost = { slug: p.slug, title: p.title }
	}

	return { prevPost, nextPost }
}
