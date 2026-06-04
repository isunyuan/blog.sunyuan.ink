/**
 * 单篇文章类型
 */
export interface Post {
	slug: string
	title: string
	date: string
	tags: string[]
	excerpt: string
	content: string
	html: string
}
