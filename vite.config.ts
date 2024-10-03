import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
// import manifest from 'Sveltension/static/manifest.json';

export default defineConfig({
	plugins: [sveltekit()], 
	build: {
		rollupOptions: {
			output: {
				inlineDynamicImports: false
			}
		}
	}
});
