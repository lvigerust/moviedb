<script lang="ts">
	import { page } from '$app/stores'
	import { Breadcrumbs, Navbar } from '$components'
	import { fade, fly } from 'svelte/transition'
	import '../app.css'
	import { afterNavigate } from '$app/navigation'
	import { backIn, backOut, cubicIn, cubicInOut, cubicOut } from 'svelte/easing'

	export let data

	$: ({ url } = data)

	let visible = false

	let duration: number

	afterNavigate(({ from }) => {
		// only animate if the navigation came from outside the page
		duration = from === null ? 1000 : 0
		// toggle visbility in any case
		visible = true
	})
</script>

<svelte:head>
	<title>{$page.data.pageTitle ?? 'Home'} — Stinkmeaner Database</title>
</svelte:head>

{#if visible}
	<div class="flex flex-col">
		<Navbar />

		<div in:fade={{ duration, delay: 500, easing: cubicIn }} class="overflow-hidden">
			<div class="mx-auto max-w-8xl">
				<main class="px-4">
					{#key url}
						<div
							class="transition-layer"
							in:fly={{ x: 500, duration: 300, delay: 300 }}
							out:fly={{ x: -500, duration: 300 }}
						>
							<slot />
							<Breadcrumbs />
						</div>
					{/key}
				</main>
			</div>
			<!-- <Footer /> -->
		</div>
	</div>
{/if}
