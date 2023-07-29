<script lang="ts">
	import { page } from '$app/stores'
	import { Navbar } from '$components'
	import Breadcrumbs from '$components/Breadcrumbs.svelte'
	import { fly } from 'svelte/transition'
	import '../app.css'

	export let data

	$: ({ url } = data)
</script>

<svelte:head>
	<title>{$page.data.pageTitle ?? 'Home'} — Stinkmeaner Database</title>
</svelte:head>

<div class="overflow-hidden">
	<div class="mx-auto max-w-8xl">
		<Navbar />

		<main class="px-4 pb-20">
			{#key url}
				<div in:fly={{ x: 500, delay: 400 }} out:fly={{ x: -500 }}>
					<slot />
				</div>
			{/key}
		</main>
		<Breadcrumbs />
	</div>
</div>
