'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { Post } from '@/types/post'

interface PostContentProps {
	post: Post
	prevPost?: { slug: string; title: string } | null
	nextPost?: { slug: string; title: string } | null
}

export default function PostContent({ post, prevPost, nextPost }: PostContentProps) {
	const articleRef = useRef<HTMLElement>(null)

	const scrollToContentTop = () => {
		setTimeout(() => {
			if (articleRef.current) {
				const top = articleRef.current.getBoundingClientRect().top + window.scrollY
				window.scrollTo({ top, behavior: 'smooth' })
			} else {
				window.scrollTo({ top: 0, behavior: 'smooth' })
			}
		}, 50)
	}

	return (
		<article
			ref={articleRef}
			className='px-4 md:px-0'
		>
			{/* 返回首页 */}
			<div className='mb-8 pt-6 md:pt-8 lg:pt-10'>
				<Link
					href='/'
					onClick={scrollToContentTop}
					className='inline-block py-2 text-xs text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white'
				>
					返回首页
				</Link>
			</div>

			{/* 文章头部：标题、日期、标签 */}
			<header className='mb-10'>
				<h1 className='text-2xl font-bold mb-2 text-black dark:text-white'>{post.title}</h1>
				<div className='text-gray-500 text-sm mb-3 dark:text-gray-400'>{post.date}</div>
				<div className='flex flex-wrap gap-2'>
					{post.tags.map((tag) => (
						<span
							key={tag}
							className='text-xs px-2 py-1 bg-gray-100 rounded-sm text-gray-600 transition-all duration-200 ease-in-out hover:bg-gray-200 hover:text-black hover:scale-102 active:bg-gray-300 active:scale-98 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
						>
							{tag}
						</span>
					))}
				</div>
			</header>

			{/* Markdown 正文区域 - Tailwind Typography 标准配置 */}
			<div
				className='prose prose-neutral max-w-none'
				dangerouslySetInnerHTML={{ __html: post.html }}
			/>

			{/* 上下篇导航 */}
			{(prevPost || nextPost) && (
				<div className='mt-16 pt-6 border-t border-gray-200 dark:border-gray-700'>
					<div className='flex flex-col sm:flex-row justify-between gap-6'>
						<div className='w-full sm:w-[45%]'>
							<p className='text-xs text-gray-400 mb-2'>上一章</p>
							{prevPost ? (
								<Link
									href={`/posts/${prevPost.slug}`}
									onClick={scrollToContentTop}
									className='block py-2 text-xs text-gray-500 hover:text-black line-clamp-2 dark:text-gray-400 dark:hover:text-white'
								>
									{prevPost.title}
								</Link>
							) : (
								<span className='block py-2 text-xs text-gray-300 dark:text-gray-600'>暂无</span>
							)}
						</div>
						<div className='w-full sm:w-[45%] sm:text-right'>
							<p className='text-xs text-gray-400 mb-2'>下一章</p>
							{nextPost ? (
								<Link
									href={`/posts/${nextPost.slug}`}
									onClick={scrollToContentTop}
									className='block py-2 text-xs text-gray-500 hover:text-black line-clamp-2 dark:text-gray-400 dark:hover:text-white'
								>
									{nextPost.title}
								</Link>
							) : (
								<span className='block py-2 text-xs text-gray-300 dark:text-gray-600'>暂无</span>
							)}
						</div>
					</div>
				</div>
			)}
		</article>
	)
}
