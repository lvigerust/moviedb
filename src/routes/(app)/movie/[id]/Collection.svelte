<script lang="ts">
	import type { MovieDetails } from '$types'
	import { slugify } from '$utils'

	export let movieDetails: MovieDetails
</script>

{#if movieDetails.belongs_to_collection && movieDetails.belongs_to_collection.backdrop_path}
	<div class="divider" />
	<section id="collection" class="relative h-72 w-full overflow-hidden rounded-lg">
		<a
			href={`/collection/${movieDetails.belongs_to_collection.id}-${slugify(
				movieDetails.belongs_to_collection.name
			)}`}
			><img
				class="h-full w-full object-cover"
				src={`https://image.tmdb.org/t/p/original/${movieDetails.belongs_to_collection.backdrop_path}`}
				alt={movieDetails.belongs_to_collection.name}
			/></a
		>
	</section>
{/if}
