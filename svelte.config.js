import adapter from '@sveltejs/adapter-auto'
import { vitePreprocess } from '@sveltejs/kit/vite'

import { preprocessMeltUI } from '@melt-ui/pp'
import sequence from 'svelte-sequential-preprocessor'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: sequence([vitePreprocess(), preprocessMeltUI()]),

	kit: {
		adapter: adapter(),
		alias: {
			$components: 'src/lib/components',
			$icons: 'src/lib/icons',
			$functions: 'src/lib/functions',
			$types: 'src/lib/types',
			$utils: 'src/lib/utils'
		}
	}
}

export default config
