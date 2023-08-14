<script lang="ts">
	export let data

	const { movieCollection } = data
</script>

<h1>{movieCollection.name}</h1>

<img
	class="mx-auto max-w-2xl rounded-lg"
	src={'https://image.tmdb.org/t/p/w1280/' + movieCollection.backdrop_path}
	alt={movieCollection.name}
/>
