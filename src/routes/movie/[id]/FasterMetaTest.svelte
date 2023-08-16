<script lang="ts">
	import type { MovieDetails } from '$types'
	import { page } from '$app/stores'

	export let movieDetails: MovieDetails
</script>

<svelte:head>
	<title>{movieDetails.title}</title>

	<meta
		property="og:image"
		content={`https://image.tmdb.org/t/p/w342/${movieDetails.poster_path}`}
	/>
	<meta
		property="og:image"
		content={`https://image.tmdb.org/t/p/w780/${movieDetails.backdrop_path}`}
	/>

	<meta property="og:title" content={movieDetails.title} />
	<meta property="og:type" content="video.movie" />
	<meta property="og:url" content={$page.url.href} />
	<meta property="og:description" content={movieDetails.overview} />

	<meta property="og:site_name" content="Filmguide" />
</svelte:head>
