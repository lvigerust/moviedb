<script lang="ts">
	import { fly } from 'svelte/transition'
	import '../app.css'
	import { beforeNavigate } from '$app/navigation'

	let animate = false

	beforeNavigate((event) => {
		if (event.to?.route.id === '/settings' && !event.from?.route.id?.includes('/settings')) {
			animate = !animate
		}
	})
</script>

<div class="flex min-h-screen flex-col justify-between overflow-hidden">
	{#key animate}
		<div out:fly={{ x: -500, duration: 300 }}>
			<slot />
		</div>
	{/key}
</div>
