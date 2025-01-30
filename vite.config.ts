import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		fs: {
			allow: [
				// Allow serving files from the project root and the static folder
				'./',
				'./static'
			]
		}
	},
	build: {
		rollupOptions: {
			output: {
				inlineDynamicImports: false
			}
		}
	}
});
