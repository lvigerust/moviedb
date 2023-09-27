<script lang="ts">
	import '../app.css'
	import { fly } from 'svelte/transition'
	import { Breadcrumbs, Navbar, Toaster } from '$components'
	import { page } from '$app/stores'
	import { dev } from '$app/environment'
	import { inject } from '@vercel/analytics'

	inject({ mode: dev ? 'development' : 'production' })

	export let data

	$: ({ url } = data)
</script>

<Toaster />

<Navbar />

<svelte:head>
	<title>{($page.data.meta && $page.data.meta.title) ?? 'Home'} — Filmguide</title>
	<meta
		name="description"
		content={($page.data.meta && $page.data.meta.description) ??
			'Use Filmguide to explore a vast collection of movies and TV shows from The Movie Database. Find detailed information, ratings, and reviews. Discover where to watch your favorite content across various streaming platforms using the Watch Providers feature, provided by JustWatch.'}
	/>
	<meta
		name="keywords"
		content="movie database, TV database, movies, movie, TV shows, TMDb API, watch providers, filmguide, tips"
	/>
	<meta name="author" content="Vigerust Webutvikling" />
</svelte:head>

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
