<script lang="ts">
	import '../app.css'
	import { page } from '$app/stores'
	import { afterNavigate, beforeNavigate } from '$app/navigation'
	import { fade, fly } from 'svelte/transition'
	import { cubicIn } from 'svelte/easing'
	import { Breadcrumbs, Navbar, Toaster, addToast } from '$components'
	import { onMount } from 'svelte'

	export let data

	$: ({ url, visited } = data)

	function createToast() {
		addToast({
			data: {
				title: 'Tip of the day',
				description: 'Use ⌘ + . to open search',
				color: ''
			},
			closeDelay: 10000
		})
	}

	let visible = false
	let animate: boolean
	let duration: number

	afterNavigate(({ from, to }) => {
		duration = from === null ? 1000 : 0
		visible = true
	})

	beforeNavigate(({ to, from }) => {
		const fromPath = from?.url.pathname.split('/')[1]
		const toPath = to?.url.pathname.split('/')[1]

		if ((toPath !== url && toPath !== fromPath) || fromPath !== 'settings') {
			animate = !animate
		}
	})

	onMount(() => {
		if (!visited) {
			createToast()
		}
	})
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
					{#key url && animate}
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

<!-- 	beforeNavigate(({ to, from }) => {
		const fromPath = from?.url.pathname.split('/')[1]
		const toPath = to?.url.pathname.split('/')[1]

		if (toPath !== url) {
			if (toPath !== fromPath || fromPath !== 'settings') {
				animate = !animate
			}
		}

		console.log(animate)
	}) -->
