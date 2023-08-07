<script lang="ts">
	import '../app.css'
	import { page } from '$app/stores'
	import { afterNavigate } from '$app/navigation'
	import { fade, fly } from 'svelte/transition'
	import { cubicIn } from 'svelte/easing'
	import { Breadcrumbs, Navbar, Toaster, addToast } from '$components'
	import { onMount } from 'svelte'

	export let data

	$: ({ url, visited } = data)

	let visible = false
	let duration: number
	afterNavigate(({ from }) => {
		duration = from === null ? 1000 : 0
		visible = true
	})

	onMount(() => {
		if (!visited) {
			createToast()
		}
	})

	function createToast() {
		addToast({
			data: {
				title: 'Tip of the day',
				description: 'Use ⌘ + . to open search',
				color: ''
			},
			closeDelay: 100000
		})
	}
</script>

<svelte:head>
	<title>{$page.data.pageTitle ?? 'Home'} — Filmguide</title>
</svelte:head>

<Toaster />

{#if visible}
	<div class="flex flex-col">
		<Navbar />

		<div in:fade={{ duration, delay: 500, easing: cubicIn }} class="overflow-hidden">
			<div class="mx-auto max-w-8xl">
				<main class="px-4">
					{#key url && url.split('/')[1]}
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
		</div>
	</div>
{/if}
