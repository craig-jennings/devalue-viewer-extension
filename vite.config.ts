import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { resolve } from 'path';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	build: {
		emptyOutDir: true,
		minify: true,
		outDir: 'dist',

		rollupOptions: {
			input: {
				devtools: resolve(__dirname, 'src/devtools.ts'),
				panel: resolve(__dirname, 'src/panel.html'),
			},

			output: {
				entryFileNames: '[name].js',
				format: 'esm',
			},
		},
	},

	plugins: [
		tailwindcss(),
		svelte(),
		viteStaticCopy({
			targets: [
				{
					src: 'manifest.json',
					dest: '.',
				},
				{
					src: 'src/devtools.html',
					dest: '.',
				},
			],
		}),
	],
});
