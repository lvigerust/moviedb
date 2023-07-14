<script lang="ts">
	import { Meta } from '$components'

	export let data

	const { movieDetails } = data
</script>

<Meta data={movieDetails} />

<img
	class="max-w-2xl"
	src={'https://image.tmdb.org/t/p/w1280/' + movieDetails.backdrop_path}
	alt={movieDetails.title}
/>

<h1 class="text-4xl">{movieDetails.title} ({new Date(movieDetails.release_date).getFullYear()})</h1>
<h2>{movieDetails.tagline}</h2>
