<script lang="ts">
	export let data

	const { collection } = data
</script>

<h1>{collection.name}</h1>

<img
	class="mx-auto max-w-2xl rounded-lg"
	src={'https://image.tmdb.org/t/p/w1280/' + collection.backdrop_path}
	alt={collection.name}
/>
