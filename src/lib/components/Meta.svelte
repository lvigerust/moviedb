<script lang="ts">
	import type { Movie, PersonDetails, Show } from '$types'
	import { page } from '$app/stores'

	export let data: Movie | Show | PersonDetails

	function description(data: Movie | Show | PersonDetails) {
		if ('overview' in data) {
			return data.overview
		} else return data.biography
	}

	function poster(data: Movie | Show | PersonDetails) {
		if ('poster_path' in data) {
			return `https://image.tmdb.org/t/p/w342/${data.poster_path}`
		} else if ('profile_path' in data) {
			return `https://image.tmdb.org/t/p/w342/${data.profile_path}`
		} else return undefined
	}

	function backdrop(data: Movie | Show | PersonDetails) {
		if ('backdrop_path' in data) {
			return `https://image.tmdb.org/t/p/w780/${data.backdrop_path}`
		} else return undefined
	}

	function title(data: Movie | Show | PersonDetails) {
		if ('title' in data) {
			return data.title
		} else return data.name
	}
</script>

<svelte:head>
	<title>{title(data)}</title>
	<meta property="og:title" content={title(data)} />
	<meta property="og:type" content="video.movie" />
	<meta property="og:url" content={$page.data.url} />
	<meta property="og:description" content={description(data)} />

	<meta property="og:image" content={poster(data)} />
	<meta property="og:image" content={backdrop(data)} />

	<meta property="og:site_name" content="Filmguide" />
</svelte:head>
