<script lang="ts">
	import { Card, Meta } from '$components'
	import { slugify } from '$functions'
	import type { Videos } from '$types'

	export let data

	const { movieDetails, movieCredits, streamed } = data

	function filteredVideos(videoArray: Videos, targetProperty1: boolean, targetProperty2: string) {
		return videoArray.results.findLast(
			(obj) => obj.official === targetProperty1 && obj.type === targetProperty2
		)
	}
</script>

<Meta data={movieDetails} />

<div class="relative mx-auto w-fit">
	<img
		class="max-w-2xl rounded-lg"
		src={'https://image.tmdb.org/t/p/w1280/' + movieDetails.backdrop_path}
		alt={movieDetails.title}
	/>

	{#if movieDetails.images.logos}
		<img
			class="absolute bottom-8 right-8"
			src={`https://image.tmdb.org/t/p/w154/${movieDetails.images.logos[0].file_path}`}
			alt={movieDetails.title}
		/>
	{/if}
</div>

<h1 class="text-4xl">{movieDetails.title} ({new Date(movieDetails.release_date).getFullYear()})</h1>
<h2 class="my-4 italic text-slate-400">{movieDetails.tagline}</h2>

<h3 class="text-xl font-semibold tracking-tight">Overview</h3>
<p class="my-2 text-sm">{movieDetails.overview}</p>

<div class="mt-8 text-sm font-medium">
	{#await streamed.external_ids}
		Loading...
	{:then external_ids}
		<a href={`https://www.imdb.com/title/${external_ids.imdb_id}/`} target="_blank">See on IMDB</a>
	{/await}
</div>

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
			<div class="text-sm">
				<p class="font-bold">{cast.name}</p>
				<p class="text-slate-400">{cast.character}</p>
			</div>
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

<!-- <div class="divider" />
<h2 class="mb-6 text-center text-3xl font-semibold tracking-tight">Media</h2>

{#await streamed.videos}
	Loading videos...
{:then videos}
	<div class="grid grid-cols-2 gap-4">
		<iframe
			class="aspect-video h-full w-full rounded-lg"
			src={`https://www.youtube.com/embed/${filteredVideos(videos, true, 'Trailer')?.key}`}
			title={filteredVideos(videos, true, 'Trailer')?.name}
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			allowfullscreen
		/>

		{#if movieDetails.images.backdrops}
			<div class="carousel w-full">
				{#each movieDetails.images.backdrops.slice(0, 8) as backdrop, index}
					<div class="carousel-item w-full">
						<img
							class="rounded-lg"
							src={`https://image.tmdb.org/t/p/w1280/${movieDetails.images.backdrops[index].file_path}`}
							alt={movieDetails.title}
						/>
					</div>
				{/each}
			</div>
		{/if}
	</div>
{/await} -->

<div class="divider" />

<h2 class="mb-6 text-center text-3xl font-semibold tracking-tight">Recommendations</h2>

{#await streamed.recommendations}
	Loading recommendations...
{:then recommendations}
	<div class="grid grid-cols-6 gap-x-12">
		{#each recommendations.slice(0, 6) as movie}
			{#if movie.poster_path}
				<Card data={movie} />
			{/if}
		{/each}
	</div>
{/await}
