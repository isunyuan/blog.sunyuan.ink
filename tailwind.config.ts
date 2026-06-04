import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
	content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			colors: {
				cactus: {
					green: '#489e79',
					dark: '#222222',
					gray: '#555555',
				},
			},
			fontFamily: {
				mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
			},
		},
	},
	plugins: [typography],
}

export default config
