import { sveltekit } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-cloudflare';

const config = {
	kit: {
		adapter: adapter()
		// other options...
	}
	// other SvelteKit config options...
};

export default config;
