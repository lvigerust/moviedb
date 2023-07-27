<script lang="ts">
	import { page } from '$app/stores'
	import { Navbar } from '$components'
	import '../app.css'
</script>

<svelte:head>
	<title>{$page.data.pageTitle ?? 'Home'} — Stinkmeaner Database</title>
</svelte:head>

<Navbar />

<main class="flex flex-col justify-center overflow-hidden px-4 pb-12 pt-4 lg:px-8">
	<slot />
</main>
