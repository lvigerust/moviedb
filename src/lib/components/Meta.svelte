<script lang="ts">
	import type { Movie, PersonDetails, Show } from '$types'

	export let data: Movie | Show | PersonDetails

	function description(data: Movie | Show | PersonDetails) {
		if ('overview' in data) {
			return data.overview
		} else return data.biography
	}

	function poster(data: Movie | Show | PersonDetails) {
		if ('poster_path' in data) {
			return data.poster_path
		} else if ('profile_path' in data) {
			return data.profile_path
		} else return undefined
	}

	function backdrop(data: Movie | Show | PersonDetails) {
		if ('backdrop_path' in data) {
			return data.backdrop_path
		} else return undefined
	}
</script>

<svelte:head>
	<meta property="og:description" content={description(data)} />

	<meta property="og:image" content={'https://image.tmdb.org/t/p/w342/' + poster(data)} />
	<meta property="og:image" content={'https://image.tmdb.org/t/p/w780/' + backdrop(data)} />

	<meta property="og:type" content="video.movie" />
	<meta property="og:site_name" content="Filmguide" />
</svelte:head>
