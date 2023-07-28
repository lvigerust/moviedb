<script lang="ts">
	import { page } from '$app/stores'
	import { Navbar } from '$components'
	import '../app.css'
</script>

<svelte:head>
	<title>{$page.data.pageTitle ?? 'Home'} — Stinkmeaner Database</title>
</svelte:head>

<div class="mx-auto flex h-full max-w-8xl flex-col">
	<Navbar />

	<main class="flex h-full flex-col px-4 pb-12 pt-4 lg:px-8">
		<slot />
	</main>
</div>
