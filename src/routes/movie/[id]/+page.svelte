<script lang="ts">
	import { Card, Meta, WatchProvider } from '$components'
	import {
		formatNumber,
		formatDate,
		formatRuntime,
		findPersonByJob,
		calculatePercentage,
		slugify
	} from '$utils'
	import { onMount } from 'svelte'
	import { inView, stagger, timeline, type TimelineDefinition } from 'motion'
	import { StatIcon } from '$icons'
	import { tweened } from 'svelte/motion'
	import FasterMetaTest from './FasterMetaTest.svelte'

	export let data

	const {
		movieDetails,
		movieCredits,
		streamed: { watchProviders, recommendations, similar, external_ids }
	} = data

	const crew = {
		director: findPersonByJob(movieCredits, 'Director'),
		writer: findPersonByJob(movieCredits, 'Writer'),
		samePerson:
			findPersonByJob(movieCredits, 'Director')?.id === findPersonByJob(movieCredits, 'Writer')?.id
	}

	const budget = tweened(0, {
		duration: 800,
		delay: 200
	})

	const revenue = tweened(0, {
		duration: 800,
		delay: 200
	})

	let sequence: TimelineDefinition

	onMount(() => {
		sequence = [
			[
				'#recommendations > ul > li, #recommendations > h2 ',
				{ y: [75, 0], opacity: [0, 1] },
				{ delay: stagger(0.05), duration: 0.8, easing: 'ease' }
			],
			[
				'#similar > ul > li, #similar > h2',
				{ y: [75, 0], opacity: [0, 1] },
				{ delay: stagger(0.05), duration: 0.8, at: '-.4', easing: 'ease' }
			]
		]
		// Tween stat numbers
		inView('#stats', () => {
			budget.set(movieDetails.budget)
			revenue.set(movieDetails.revenue)
		})

		inView('#recommendations', () => {
			timeline(sequence)
		})
	})
</script>

<!-- <Meta data={movieDetails} /> -->
<FasterMetaTest {movieDetails} />

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
	{#if crew.samePerson && crew.director}
		<div>
			<a
				href={`/person/${crew.director.id}-${slugify(crew.director.name ?? '')}`}
				class="font-medium tracking-tight text-slate-300 transition-colors hover:text-slate-200"
				>{crew.director?.name}</a
			>
			<p class="text-sm">Director, Writer</p>
		</div>
	{:else}
		{#if crew.director}
			<div>
				<a
					href={`/person/${crew.director.id}-${slugify(crew.director.name ?? '')}`}
					class="font-medium tracking-tight text-slate-300 transition-colors hover:text-slate-200"
					>{crew.director.name}</a
				>
				<p class="text-sm">Director</p>
			</div>
		{/if}

		{#if crew.writer}
			<div>
				<a
					href={`/person/${crew.writer.id}-${slugify(crew.writer.name ?? '')}`}
					class="font-medium tracking-tight text-slate-300 transition-colors hover:text-slate-200"
					>{crew.writer.name}</a
				>
				<p class="text-sm">Writer</p>
			</div>
		{/if}
	{/if}
</div>

<div class="divider" />

<section id="cast" class="mb-6">
	<div class="mb-6 flex items-center justify-between">
		<a class="text-2xl font-semibold tracking-tight text-slate-300" href={'#'}>Top Billed Cast</a>
		<a class="text-sm hover:underline" href={'#'}>Full Cast & Crew</a>
	</div>

	<div class="grid grid-flow-col place-content-evenly gap-4 px-2">
		{#each movieCredits.cast.slice(0, 6) as cast}
			<a href={`/person/${cast.id}-${slugify(cast.name)}`} class="group flex items-center gap-2">
				<div class="avatar">
					<div class="duration-400 w-16 rounded-full transition-transform group-hover:scale-105">
						<img src={`https://images.tmdb.org/t/p/w185/${cast.profile_path}`} alt={cast.name} />
					</div>
				</div>
				<div class="text-sm">
					<p class="font-bold text-slate-300">{cast.name}</p>
					<p class="">{cast.character}</p>
				</div>
			</a>
		{/each}
	</div>
</section>

<section id="stats">
	<div class="divider" />

	<div class="stats w-full justify-center">
		{#if movieDetails.budget}
			<div class="stat">
				<div class="stat-figure text-primary">
					<StatIcon />
				</div>
				<div class="stat-title">Budget</div>
				<div class="stat-value text-primary">{formatNumber($budget)}</div>
			</div>
		{/if}

		{#if movieDetails.revenue}
			<div class="stat">
				<div class="stat-figure text-secondary">
					<StatIcon icon="banknotes" />
				</div>
				<div class="stat-title">Revenue</div>
				<div class="stat-value text-secondary">{formatNumber($revenue)}</div>
				<div class="stat-desc">
					{calculatePercentage(movieDetails.revenue, movieDetails.budget).toFixed(0)}% {movieDetails.revenue >
					movieDetails.budget
						? 'increase'
						: 'decrease'} from budget
				</div>
			</div>
		{/if}

		<div class="stat">
			<div class="stat-figure text-accent">
				<StatIcon icon="date" />
			</div>
			<div class="stat-title">Status</div>
			<div class="stat-value text-accent">{movieDetails.status}</div>
			<div class="stat-desc">{formatDate(movieDetails.release_date)}</div>
		</div>
	</div>
</section>

{#if movieDetails.belongs_to_collection}
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

<section id="recommendations" class="mb-6">
	{#await recommendations then recommendations}
		<div class="divider" />

		<h2 id="" class="mb-6 text-2xl font-semibold tracking-tight text-slate-300">
			{recommendations.length ? 'Recommendations' : ''}
		</h2>
		<ul id="listContainer" class="grid grid-cols-8 gap-x-5">
			{#each recommendations.slice(0, 8) as movie}
				{#if movie.poster_path}
					<li>
						<Card data={movie} />
					</li>
				{/if}
			{/each}
		</ul>
	{/await}
</section>

<section id="similar" class="mb-6">
	{#await similar then similar}
		<h2 id="" class="mb-6 text-2xl font-semibold tracking-tight text-slate-300">
			{similar.length ? 'Similar Movies' : ''}
		</h2>
		<ul id="listContainer" class="grid grid-cols-8 gap-x-5">
			{#each similar.slice(0, 8) as movie}
				{#if movie.poster_path}
					<li>
						<Card data={movie} />
					</li>
				{/if}
			{/each}
		</ul>
	{/await}
</section>
