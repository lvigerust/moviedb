<script lang="ts">
	import { Card, Meta } from '$components'
	import { slugify } from '$functions'

	export let data

	const { movieDetails, movieCredits, streamed } = data

	$: console.log(streamed)
</script>

<Meta data={movieDetails} />

<img
	class="mx-auto max-w-2xl rounded-lg"
	src={'https://image.tmdb.org/t/p/w1280/' + movieDetails.backdrop_path}
	alt={movieDetails.title}
/>

<h1 class="text-4xl">{movieDetails.title} ({new Date(movieDetails.release_date).getFullYear()})</h1>
<h2>{movieDetails.tagline}</h2>

{#await streamed.external_ids}
	Loading...
{:then external_ids}
	<a href={`https://www.imdb.com/title/${external_ids.imdb_id}/`} target="_blank">See on IMDB</a>
{/await}

<div class="divider" />

<h2 class="mb-6 text-center text-3xl font-semibold tracking-tight">Cast</h2>

<div class="grid grid-flow-col place-content-around">
	{#each movieCredits.cast.slice(0, 6) as cast}
		<a href={`/person/${cast.id}-${slugify(cast.name)}`} class="flex items-center gap-2">
			<div class="avatar">
				<div class="w-16 rounded-full">
					<img src={`https://images.tmdb.org/t/p/w185/${cast.profile_path}`} alt={cast.name} />
				</div>
			</div>
			{cast.name}
		</a>
	{/each}
</div>

<div class="divider" />

{#if movieDetails.belongs_to_collection}
	<h2 class="mb-6 text-center text-3xl font-semibold tracking-tight">Collection</h2>
	<a
		href={`/collection/${movieDetails.belongs_to_collection.id}-${slugify(
			movieDetails.belongs_to_collection.name
		)}`}
		><img
			class="mx-auto max-w-2xl rounded-lg"
			src={'https://image.tmdb.org/t/p/w1280/' + movieDetails.belongs_to_collection.backdrop_path}
			alt={movieDetails.belongs_to_collection.name}
		/></a
	>
{/if}

<div class="divider" />

<h2 class="mb-6 text-center text-3xl font-semibold tracking-tight">Recommendations</h2>

{#await streamed.recommendations}
	Loading recommendations...
{:then recommendations}
	<div class="grid grid-flow-col place-content-center gap-x-12">
		{#each recommendations.slice(0, 6) as movie}
			{#if movie.poster_path}
				<Card data={movie} />
			{/if}
		{/each}
	</div>
{/await}
