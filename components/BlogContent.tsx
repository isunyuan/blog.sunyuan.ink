'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { Post } from '@/types/post'

gsap.registerPlugin(ScrollTrigger)

interface BlogContentProps {
	posts: Post[]
}

export default function BlogContent({ posts }: BlogContentProps) {
	const headerRef = useRef<HTMLDivElement>(null)
	const descRef = useRef<HTMLDivElement>(null)
	const listHeadRef = useRef<HTMLHeadingElement>(null)
	const listWrapRef = useRef<HTMLDivElement>(null)
	const footerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const tl = gsap.timeline({
			defaults: { ease: 'power2.out', duration: 0.35 },
		})

		tl.fromTo(headerRef.current, { opacity: 0, y: -12 }, { opacity: 1, y: 0 })
			.fromTo(descRef.current, { opacity: 0, x: -8 }, { opacity: 1, x: 0 }, '-=0.2')
			.fromTo(listHeadRef.current, { opacity: 0, y: 6 }, { opacity: 1, y: 0 }, '-=0.15')

		if (listWrapRef.current) {
			const listItems = Array.from(listWrapRef.current.children)

			ScrollTrigger.batch(listItems, {
				start: 'top 95%',
				once: true,
				onEnter: (batch) => {
					gsap.fromTo(
						batch,
						{ opacity: 0, y: 6 },
						{
							opacity: 1,
							y: 0,
							duration: 0.3,
							ease: 'power2.out',
							stagger: 0.06,
						},
					)
				},
			})

			const linkItems = gsap.utils.toArray<HTMLAnchorElement>(listWrapRef.current.querySelectorAll('a'))
			const mouseEvents: Array<{ el: HTMLAnchorElement; enter: () => void; leave: () => void }> = []

			linkItems.forEach((link) => {
				const handleEnter = () => {
					gsap.to(link, { x: 3, duration: 0.18, ease: 'power2.out' })
				}
				const handleLeave = () => {
					gsap.to(link, { x: 0, duration: 0.18, ease: 'power2.out' })
				}
				link.addEventListener('mouseenter', handleEnter)
				link.addEventListener('mouseleave', handleLeave)
				mouseEvents.push({ el: link, enter: handleEnter, leave: handleLeave })
			})

			return () => {
				mouseEvents.forEach(({ el, enter, leave }) => {
					el.removeEventListener('mouseenter', enter)
					el.removeEventListener('mouseleave', leave)
				})
				ScrollTrigger.killAll()
				gsap.killTweensOf('*')
			}
		}

		return () => {
			ScrollTrigger.killAll()
			gsap.killTweensOf('*')
		}
	}, [])

	return (
		<>
			<header
				ref={headerRef}
				className='mb-12 pt-12 md:pt-16 lg:pt-20'
			>
				<div className='flex items-center gap-3 mb-3'>
					{/* 👏 立体hover动效：上浮+旋转+轻微放大，桌面/移动端都适配 */}
					<Link
						href='/'
						className='font-bold inline-block transition-all duration-300 ease-out
						hover:-translate-y-1 hover:rotate-6 hover:scale-105
						active:translate-y-0 active:rotate-0 active:scale-100'
					>
						<span className='text-4xl mr-1 inline-block'>👏</span>
					</Link>
					<h1 className='text-2xl font-bold tracking-tight text-black'>Blog</h1>
				</div>
				<nav className='flex flex-wrap gap-x-5 gap-y-2 text-sm items-center'>
					<Link
						href='https://github.com/isunyuan'
						target='_blank'
						rel='noopener noreferrer'
					>
						<Image
							src='/black-github.svg'
							alt='Github'
							width={16}
							height={16}
							className='hover:opacity-60 transition-opacity duration-200'
						/>
					</Link>
				</nav>

				<div
					ref={descRef}
					className='mt-8 leading-[1.75] text-sm text-gray-700'
				>
					<p>由 Next.js、TypeScript 和 Markdown 驱动</p>
					<p>记录代码、折腾、思考，以及那些不值得发朋友圈的小事</p>
				</div>
			</header>

			<section className='mb-12'>
				<h2
					ref={listHeadRef}
					className='text-xl font-bold mb-6'
				>
					ALL
				</h2>
				<div
					ref={listWrapRef}
					className='space-y-[0.75rem] [&>*]:opacity-0'
				>
					{posts.map((post) => (
						<div
							key={post.slug}
							className='flex flex-col sm:flex-row text-sm sm:items-center px-2 py-1.5 rounded hover:bg-gray-100 transition-colors duration-200'
						>
							<span className='sm:w-[110px] shrink-0 text-gray-500'>{post.date}</span>
							<Link
								href={`/posts/${post.slug}`}
								className='underline-offset-[3px] text-black hover:underline transition-colors duration-200 mt-1 sm:mt-0 inline-block'
							>
								{post.title}
							</Link>
						</div>
					))}
				</div>
			</section>

			<footer
				ref={footerRef}
				className='pt-6 border-t border-gray-200 text-xs text-gray-500 flex flex-col sm:flex-row justify-between gap-3 mt-12'
			>
				<span>Copyright © 2025 sunyuan.ink</span>
			</footer>
		</>
	)
}
