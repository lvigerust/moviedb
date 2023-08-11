<script lang="ts">
	import type { Movie, Person, Show } from '$types'

	export let data: Movie | Show | Person

	function description(data: Movie | Show | Person) {
		if ('overview' in data) {
			return data.overview
		} else return data.biography
	}

	function poster(data: Movie | Show | Person) {
		if ('profile_path' in data) {
			return data.profile_path
		} else return data.poster_path
	}

	function backdrop(data: Movie | Show | Person) {
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
