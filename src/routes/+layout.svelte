<script lang="ts">
	import '../app.css'
	import { dev } from '$app/environment'
	import { inject } from '@vercel/analytics'

	import { page } from '$app/stores'

	$: console.log($page)

	// inject({ mode: dev ? 'development' : 'production' })
</script>

<slot />
