<script lang="ts">
	import type { Movie, Show } from '$types'

	export let data: Movie | Show
</script>

<svelte:head>
	<meta property="og:description" content={data.overview || data.biography} />
	<meta property="og:image" content={'https://image.tmdb.org/t/p/w342/' + data.poster_path} />
	<meta property="og:image" content={'https://image.tmdb.org/t/p/w780/' + data.backdrop_path} />

	{#if data.profile_path}
		<meta property="og:image" content={'https://image.tmdb.org/t/p/w185/' + data.profile_path} />
	{/if}

	<meta property="og:type" content="video.movie" />
	<meta property="og:site_name" content="Stinkmeaner" />
</svelte:head>
