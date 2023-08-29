<script lang="ts">
	import '../app.css'
	import { fly } from 'svelte/transition'
	import { beforeNavigate } from '$app/navigation'
	import { dev } from '$app/environment'
	import { inject } from '@vercel/analytics'

	inject({ mode: dev ? 'development' : 'production' })

	let animate = false

	beforeNavigate((event) => {
		if (event.to?.route.id === '/settings' && !event.from?.route.id?.includes('/settings')) {
			animate = !animate
		}
	})
</script>

<div class="flex min-h-screen flex-col justify-between">
	{#key animate}
		<div out:fly={{ x: -500, duration: 300 }}>
			<slot />
		</div>
	{/key}
</div>
