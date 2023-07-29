<script lang="ts">
	import { page } from '$app/stores'
	import { Breadcrumbs, Navbar, Footer } from '$components'
	import { fly } from 'svelte/transition'
	import '../app.css'

	export let data

	$: ({ url } = data)
</script>

<svelte:head>
	<title>{$page.data.pageTitle ?? 'Home'} — Stinkmeaner Database</title>
</svelte:head>

<div class="flex flex-col">
	<Navbar />
	<div class="overflow-hidden">
		<div class="mx-auto max-w-8xl">
			<main class="px-4 pb-20">
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
			<Breadcrumbs />
		</div>
		<!-- <Footer /> -->
	</div>
</div>
