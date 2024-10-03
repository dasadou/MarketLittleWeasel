// import adapter from '@sveltejs/adapter-auto';
// import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

// /** @type {import('@sveltejs/kit').Config} */
// const config = {
// 	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
// 	// for more information about preprocessors
// 	preprocess: vitePreprocess(),

// 	kit: {
// 		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
// 		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
// 		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
// 		adapter: adapter()
// 	}
// };

// export default config;
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
		appDir: 'app',
		// csp: {
		// 	mode: 'auto',
		// 	directives: {
		// 		'default-src': ['unsafe-line'],
		// 		'script-src': [
		// 			'unsafe-inline', // Allow unsafe-inline for inline scripts
		// 			'self'
		// 			// 	"'sha256-rZOxiCr1v2O5foxYrQUndAN0cml+BRluuPlC2C0bqYg='", // Include the hash for the inline script
		// 		],
		// 		'style-src': ['self', 'unsafe-inline'],
		// 		'img-src': ['self', 'data:'],
		// 		'connect-src': ['self'],
		// 		'font-src': ['self'],
		// 		'object-src': ['none'],
		// 		'frame-ancestors': ['none'],
		// 		'base-uri': ['self'],
		// 		'form-action': ['self']
		// 	}
		// }
	}
};

export default config;