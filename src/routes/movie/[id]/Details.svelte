<script lang="ts">
	import { WatchProvider } from '$components'
	import type { Credit, Credits, MovieDetails } from '$types'
	import { findPersonByJob, formatDate, formatRuntime, slugify } from '$utils'
	import type { ProviderOptions } from '../../tv/[id]/+page.server'

	export let movieDetails: MovieDetails
	export let watchProviders: Promise<ProviderOptions>
	export let movieCredits: Promise<Credits>
</script>

<section id="details">
	<div class="ml-[calc(-50vw+50%)] h-fit w-screen">
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
				class="h-[450px] w-full object-cover"
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

			<div class="mt-2 flex">
				<p class="">{formatDate(movieDetails.release_date)}</p>
				<span class="mx-4 select-none font-bold">•</span>
				{#if movieDetails.runtime}
					<p>{formatRuntime(movieDetails.runtime)}</p>
					<span class="mx-4 select-none font-bold">•</span>
				{/if}
				{#each movieDetails.genres.slice(0, 5) as genre, index}
					<a href={`/movie/genre/${genre.id}`}>{genre.name}</a>

					{#if index < 5 - 1 && index < movieDetails.genres.length - 1}
						<p>,&nbsp;</p>
					{/if}
				{/each}
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
							findPersonByJob(movieCredits, 'Director')?.name
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
