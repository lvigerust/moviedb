<script lang="ts">
	export let data: Movie
</script>

<svelte:head>
	<meta property="og:title" content={data.title} />
	<meta property="og:description" content={data.overview} />
	<meta property="og:image" content={'https://image.tmdb.org/t/p/w342/' + data.poster_path} />
	<meta property="og:image" content={'https://image.tmdb.org/t/p/w780/' + data.backdrop_path} />
	<meta property="og:type" content="video.movie" />
	<meta property="og:site_name" content="Stinkmeaner" />
</svelte:head>
