<script lang="ts">
	import { Meta, Skeleton, WatchProvider } from '$components'
	import { formatDate, slugify } from '$utils'

	export let data

	const {
		showDetails,
		streamed: { watchProviders, credits }
	} = data
</script>

<Meta />

<div class="ml-[calc(-50vw+50%)] h-fit w-screen">
	<div class="relative h-full w-full">
		<div class="absolute z-30 h-full w-full bg-gradient-to-t from-base-100" />

		{#if showDetails.images && showDetails.images.logos[0]}
			<img
				class="absolute bottom-12 right-20 max-w-sm"
				src={'https://image.tmdb.org/t/p/original/' + showDetails.images.logos[0].file_path}
				alt={`${showDetails.name} logo`}
			/>
		{/if}

		<img
			class="h-[450px] w-full object-cover"
			src={'https://image.tmdb.org/t/p/original/' + showDetails.backdrop_path}
			alt={showDetails.name}
		/>
	</div>
</div>

<div class="flex items-center justify-between">
	<div>
		<h1 class="text-4xl font-bold text-slate-200">
			{showDetails.name}
			<span class="font-normal text-slate-300"
				>({new Date(showDetails.first_air_date).getFullYear()})</span
			>
		</h1>

		<div class="mt-2 flex">
			<p class="">{formatDate(showDetails.first_air_date)}</p>
			<span class="mx-4 select-none font-bold">•</span>
			<p>
				{showDetails.number_of_seasons} Season{#if showDetails.number_of_seasons > 1}
					s
				{/if}
			</p>
			<span class="mx-4 select-none font-bold">•</span>
			<p>
				{showDetails.number_of_episodes} Episode{#if showDetails.number_of_episodes > 1}
					s
				{/if}
			</p>
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

{#if showDetails.next_episode_to_air}
	<p class="my-10">Next episode: {formatDate(showDetails.next_episode_to_air.air_date)}</p>
{/if}

<h2 class="my-10 italic">{showDetails.tagline}</h2>

<h3 class="text-xl font-semibold tracking-tight text-slate-300">Overview</h3>
<p class="my-2 max-w-4xl text-sm text-slate-400">{showDetails.overview}</p>
<div class="divider" />

<section id="cast" class="mb-6">
	<div class="mb-6 flex items-center justify-between">
		<a class="text-2xl font-semibold tracking-tight text-slate-300" href={'#'}>Top Billed Cast</a>
		<a class="text-sm hover:underline" href={'#'}>Full Cast & Crew</a>
	</div>

	<div class="grid grid-flow-col place-content-evenly gap-4 px-2">
		{#await credits}
			<div class="w-36">
				<Skeleton />
			</div>
		{:then credits}
			{#each credits.cast.slice(0, 6) as cast}
				<a href={`/person/${cast.id}-${slugify(cast.name)}`} class="group flex items-center gap-2">
					<div class="avatar">
						<div class="duration-400 w-16 rounded-full transition-transform group-hover:scale-105">
							<img src={`https://images.tmdb.org/t/p/w185/${cast.profile_path}`} alt={cast.name} />
						</div>
					</div>
					<div class="text-sm">
						<p class="font-bold text-slate-300">{cast.name}</p>
					</div>
				</a>
			{/each}
		{/await}
	</div>
</section>
