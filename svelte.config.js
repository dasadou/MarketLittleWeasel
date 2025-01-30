// export default config with the helper;
import adapter from 'sveltekit-adapter-chrome-extension';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			// default options are shown. On some platforms
			// these options are set automatically — see below
			pages: 'build',
			assets: 'build',
			//   fallback: undefined,
			fallback: null,
			precompress: false,
			// strict: true,
			manifest: 'manifest.json'
		}),
		appDir: 'app'
	}
};

export default config;
