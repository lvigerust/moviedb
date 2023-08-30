<script lang="ts">
	import { page } from '$app/stores'
</script>

<svelte:head>
	<meta property="og:title" content={$page.data.meta.metaTitle} />
	<meta property="og:type" content="video.movie" />
	<meta property="og:url" content={$page.url.href} />
	<meta property="og:image" content={$page.data.meta.image1} />
	<meta property="og:image" content={$page.data.meta.image2} />
	<meta property="og:description" content={$page.data.meta.metaDescription} />
	<meta property="og:site_name" content="Filmguide" />
</svelte:head>
