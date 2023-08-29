<script lang="ts">
	import { page } from '$app/stores'
	import { fly } from 'svelte/transition'
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

	onMount(() => {
		if (!visited) {
			createToast()
		}
	})
</script>

<svelte:head>
	<title>{$page.data.pageTitle ?? 'Home'} — Filmguide</title>
	<meta
		name="description"
		content="Use Filmguide to explore a vast collection of movies and TV shows. Find detailed information, ratings, and reviews. Discover where to watch your favorite content across various streaming platforms using the Watch Providers feature."
	/>
	<meta
		name="keywords"
		content="movie database, TV database, movies, TV shows, TMDb API, watch providers, credits"
	/>
	<meta name="author" content="Vigerust Webutvikling" />
</svelte:head>

<Toaster />

<Navbar />

<div class="overflow-hidden">
	<main class="mx-auto max-w-8xl px-4">
		{#key url}
			<div
				class="transition-layer"
				in:fly={{ x: 500, duration: 300, delay: 300 }}
				out:fly={{ x: -500, duration: 300 }}
			>
				<slot />
			</div>
		{/key}
	</main>
</div>

{#if url !== '/'}
	<Breadcrumbs />
{/if}
