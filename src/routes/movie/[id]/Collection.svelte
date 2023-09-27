<script lang="ts">
	import type { MovieDetails } from '$types'
	import { slugify } from '$utils'

	export let movieDetails: MovieDetails
</script>

{#if movieDetails.belongs_to_collection && movieDetails.belongs_to_collection.backdrop_path}
	<div class="divider" />
	<section id="collection">
		<a
			class="relative inline-block h-72 w-full overflow-hidden rounded-lg"
			href={`/collection/${movieDetails.belongs_to_collection.id}-${slugify(
				movieDetails.belongs_to_collection.name
			)}`}
			><img
				class="h-full w-full object-cover object-center"
				src={`https://image.tmdb.org/t/p/original/${movieDetails.belongs_to_collection.backdrop_path}`}
				alt={movieDetails.belongs_to_collection.name}
			/>

			<div
				class="absolute inset-0 flex h-full w-full flex-col justify-center rounded-b-xl bg-gradient-to-r from-black/50 px-12"
			>
				<h3 class="text-3xl font-bold text-slate-300">
					Part of the {movieDetails.belongs_to_collection.name}
				</h3>

				<button class="btn btn-ghost w-fit rounded-full">View Collection</button>
			</div>
		</a>
	</section>
{/if}
