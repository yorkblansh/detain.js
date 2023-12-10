import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsConfigPaths from 'vite-tsconfig-paths'
import dts from 'vite-plugin-dts'

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
			exclude: [resolve('example')],
			insertTypesEntry: true,
			// include: ['src/detain.ts'],
			beforeWriteFile: (filePath, content) => ({
				filePath: filePath.replace('/src', ''),
				content,
			}),
		}),
	],
	base: '/example',
	build: {
		outDir: 'lib',
		sourcemap: true,
		minify: false,
		lib: {
			formats: ['es'],
			entry: resolve('src', 'detain.ts'),
			name: 'ReactFeatureFlag',
			fileName: () => `detain.js`,
		},
		rollupOptions: {
			external: ['react'],
		},
	},
}))
