<script lang="ts">
	import { WatchProvider } from '$components'
	import type { Credits, MovieDetails, OMDBData, ReleaseDate } from '$types'
	import { findPersonByJob, formatDate, formatRuntime, slugify } from '$utils'
	import type { ProviderOptions } from '../../tv/[id]/+page.server'

	export let movieDetails: MovieDetails
	export let watchProviders: Promise<ProviderOptions>
	export let movieCredits: Promise<Credits>
	export let release_dates: Promise<ReleaseDate | null>
	export let omdb: OMDBData
</script>

<section id="details">
	<div class="ml-[calc(-50vw+50%)] w-screen">
		<div class="relative h-full w-full">
			<div class="absolute z-30 h-full w-full bg-gradient-to-t from-base-100" />

			{#if movieDetails.images && movieDetails.images.logos[0]}
				<img
					class="absolute bottom-12 right-20 max-w-sm"
					src={'https://image.tmdb.org/t/p/original/' + movieDetails.images.logos[0].file_path}
					alt={`${movieDetails.title} logo`}
				/>
			{/if}

			<img
				class="h-[510px] w-full object-cover"
				src={'https://image.tmdb.org/t/p/original/' + movieDetails.backdrop_path}
				alt={movieDetails.title}
			/>
		</div>
	</div>
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-4xl font-bold text-slate-200">
				{movieDetails.title}
				<span class="font-normal text-slate-300"
					>({new Date(movieDetails.release_date).getFullYear()})</span
				>
			</h1>

			<div class="mt-2 flex items-center font-medium text-base-content/80">
				{#await release_dates then release_dates}
					{#if release_dates && release_dates.release_dates[0].certification}
						<span
							class="mr-3 inline-flex items-center rounded-md bg-slate-600/30 px-2 py-1 text-xs font-medium text-slate-400 ring-1 ring-inset ring-slate-400/20"
							>{release_dates?.release_dates[0].certification}</span
						>
					{/if}
				{/await}
				<p>{formatDate(movieDetails.release_date)}</p>

				<span class="mx-3 select-none font-bold">•</span>

				{#each movieDetails.genres.slice(0, 4) as genre, index}
					<a href={`/movie/genre/${genre.id}`}>{genre.name}</a>

					{#if index < 4 - 1 && index < movieDetails.genres.length - 1}
						<p>,&nbsp;</p>
					{/if}
				{/each}
				{#if movieDetails.runtime}
					<span class="mx-3 select-none font-bold">•</span>
					<p>{formatRuntime(movieDetails.runtime)}</p>
				{/if}
				{#if omdb.imdbRating !== 'N/A'}
					<span class="mx-3 select-none font-bold">•</span>
					<a
						href={`https://www.imdb.com/title/${omdb.imdbID}`}
						rel="noreferrer"
						target="_blank"
						title={`${movieDetails.title} - IMDb`}
						class="mr-3 inline-flex items-center rounded-md bg-yellow-400/10 px-2 py-1 text-xs font-medium text-yellow-500/90 ring-1 ring-inset ring-yellow-500/25"
						>IMDb: {omdb.imdbRating}</a
					>
				{/if}
			</div>
		</div>

		<div class="-mb-4 mr-4">
			{#await watchProviders then watchProviders}
				{#if watchProviders}
					<WatchProvider {watchProviders} />
				{/if}
			{/await}
		</div>
	</div>

	<h2 class="my-10 italic">{movieDetails.tagline}</h2>

	<h3 class="text-xl font-semibold tracking-tight text-slate-300">Overview</h3>
	<p class="my-2 max-w-4xl text-sm">{movieDetails.overview}</p>

	<div class="mb-10 mt-12 flex gap-8">
		{#await movieCredits then movieCredits}
			{#if findPersonByJob(movieCredits, 'Director')?.id === findPersonByJob(movieCredits, 'Writer')?.id}
				<div>
					<a
						href={`/person/${findPersonByJob(movieCredits, 'Director')?.id}-${slugify(
							findPersonByJob(movieCredits, 'Director')?.name ?? ''
						)}`}
						class="font-medium tracking-tight text-slate-300 transition-colors hover:text-slate-200"
						>{findPersonByJob(movieCredits, 'Director')?.name ?? ''}</a
					>
					<p class="text-sm">Director, Writer</p>
				</div>
			{:else}
				<div>
					<a
						href={'#'}
						class="font-medium tracking-tight text-slate-300 transition-colors hover:text-slate-200"
						>{findPersonByJob(movieCredits, 'Director')?.name ?? ''}</a
					>
					<p class="text-sm">{findPersonByJob(movieCredits, 'Director')?.job ?? ''}</p>
				</div>
				<div>
					<a
						href={'#'}
						class="font-medium tracking-tight text-slate-300 transition-colors hover:text-slate-200"
						>{findPersonByJob(movieCredits, 'Writer')?.name ?? ''}</a
					>
					<p class="text-sm">{findPersonByJob(movieCredits, 'Writer')?.job ?? ''}</p>
				</div>
			{/if}
		{/await}
	</div>
</section>
