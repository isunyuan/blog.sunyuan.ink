import type { Metadata } from 'next'
import './globals.css'

export const SITE_CONFIG = {
	url: 'https://sunyuan.ink',
	name: 'sunyuan.ink',
	author: 'sunyuan',
	authorEmail: 'email@sunyuan.ink',
	description:
		'写代码，记生活，偶尔思考人生。一个基于 Next.js、TypeScript 和 Markdown 构建的个人博客，存放技术、灵感与日常。',
}

export const metadata: Metadata = {
	metadataBase: new URL(SITE_CONFIG.url),
	title: {
		default: SITE_CONFIG.name,
		template: '%s | ' + SITE_CONFIG.name,
	},
	description: SITE_CONFIG.description,
	keywords: [
		'sunyuan',
		'sunyuan Blog',
		'personal blog',
		'Next.js',
		'TypeScript',
		'Markdown',
		'frontend',
		'web development',
		'programming',
		'技术博客',
		'技术笔记',
		'前端开发',
		'开发日志',
		'生活随笔',
	],
	authors: [
		{
			name: SITE_CONFIG.author,
			url: SITE_CONFIG.url,
		},
	],
	creator: SITE_CONFIG.author,
	publisher: SITE_CONFIG.author,
	robots: {
		index: true,
		follow: true,
	},
	openGraph: {
		type: 'website',
		locale: 'zh_CN',
		url: SITE_CONFIG.url,
		siteName: SITE_CONFIG.name,
		title: SITE_CONFIG.name,
		description: SITE_CONFIG.description,
	},
	twitter: {
		card: 'summary',
		title: SITE_CONFIG.name,
		description: SITE_CONFIG.description,
	},
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html
			lang='zh-CN'
			data-scroll-behavior='smooth'
		>
			<body
				className='min-h-screen flex flex-col items-center font-mono text-black antialiased'
				style={{
					backgroundColor: '#ffffff',
					backgroundImage: 'radial-gradient(#00000012 0.5px, transparent 0.5px)',
					backgroundSize: '10px 10px',
					backgroundAttachment: 'fixed',
				}}
			>
				{/* 外层容器：去掉顶部 pt，只做宽度约束 */}
				<div
					className='w-full max-w-[720px]
            px-6 sm:px-8 md:px-10 lg:px-12
            pb-8 md:pb-12 lg:pb-14'
				>
					{children}
				</div>
			</body>
		</html>
	)
}
