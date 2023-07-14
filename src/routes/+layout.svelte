<script lang="ts">
	import { page } from '$app/stores'
	import { Navbar } from '$components'
	import '../app.css'

	$: console.log($page.params)
</script>

<svelte:head>
	<title>{$page.data.pageTitle ?? 'Home'} — Stinkmeaner Database</title>
</svelte:head>

<Navbar />

<main class="px-4 lg:px-8 flex flex-col justify-center">
	<slot />
</main>
