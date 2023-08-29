<script lang="ts">
	import { page } from '$app/stores'
</script>

<svelte:head>
	<title>{$page.data.meta.title} — Filmguide</title>

	<meta property="og:image" content={$page.data.meta.image1} />
	<meta property="og:image" content={$page.data.meta.image2} />
</svelte:head>
