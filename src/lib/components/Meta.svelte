<script lang="ts">
	import type { Movie, Show } from '$types'

	export let data: Movie | Show
</script>

<svelte:head>
	<meta property="og:description" content={data.overview} />
	<meta property="og:image" content={'https://image.tmdb.org/t/p/w342/' + data.poster_path} />
	<meta property="og:image" content={'https://image.tmdb.org/t/p/w780/' + data.backdrop_path} />
	<meta property="og:type" content="video.movie" />
	<meta property="og:site_name" content="Filmguide" />
</svelte:head>
