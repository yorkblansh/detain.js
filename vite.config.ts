import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsConfigPaths from 'vite-tsconfig-paths'
import dts from 'vite-plugin-dts'
import { EsLinter, linterPlugin } from 'vite-plugin-linter'

// https://vitejs.dev/config/
export default defineConfig((configEnv) => ({
	plugins: [
		react(),
		tsConfigPaths(),
		// linterPlugin({
		// 	include: ["./src}/**/*.{ts,tsx}"],
		// 	linters: [new EsLinter({ configEnv })],
		// }),
		dts({
			insertTypesEntry: true,
			include: ['lib/detain.ts'],
			beforeWriteFile: (filePath, content) => ({
				filePath: filePath.replace('/lib', ''),
				content,
			}),
		}),
	],
	build: {
		minify: true,
		lib: {
			// formats: ['es'],
			entry: resolve('lib', 'detain.ts'),
			name: 'ReactFeatureFlag',
			fileName: (format) => `detain.js`,
		},
		rollupOptions: {
			external: ['react'],
		},
	},
}))
