<script lang="ts">
	import { Card, Meta } from '$components'
	import { slugify } from '$functions'
	import { formatNumber, formatDate, formatRuntime, findPersonByJob } from '$utils'
	import { onMount } from 'svelte'
	import { animate, inView, stagger } from 'motion'
	import Section from './Section.svelte'
	import { StatIcon } from '$icons'
	import { tweened } from 'svelte/motion'
	import { cubicIn, cubicOut } from 'svelte/easing'

	export let data

	const { movieDetails, movieCredits, streamed, watchProviders } = data

	const crew = {
		director: findPersonByJob(movieCredits, 'Director')?.name,
		writer: findPersonByJob(movieCredits, 'Writer')?.name,
		samePerson:
			findPersonByJob(movieCredits, 'Director')?.id === findPersonByJob(movieCredits, 'Writer')?.id
	}

	const budget = tweened(0, {
		duration: 800,
		easing: cubicIn
	})

	const revenue = tweened(0, {
		duration: 800,
		easing: cubicOut
	})

	onMount(() => {
		// Tween stat numbers
		inView('#stats', () => {
			budget.set(movieDetails.budget)
			revenue.set(movieDetails.revenue)
		})

		// Stagger recommended movies
		inView('#recommendations', ({ target }) => {
			animate(
				target.querySelectorAll('#listContainer > li'),
				{ x: [150, 0], opacity: [0, 1] },
				{ delay: stagger(0.05), duration: 0.9, easing: 'ease' }
			)
			animate(
				target.querySelectorAll('#recommendations-title'),
				{ x: [150, 0], opacity: [0, 1] },
				{ delay: stagger(0.05), duration: 0.9, easing: 'ease' }
			)
		})
	})
</script>

<Meta data={movieDetails} />

<div class="ml-[calc(-50vw+50%)] h-fit w-screen">
	<div class="relative h-full w-full">
		<div class="absolute z-30 h-full w-full bg-gradient-to-t from-base-100" />

		<img
			class="h-[450px] w-full object-cover"
			src={'https://image.tmdb.org/t/p/original/' + movieDetails.backdrop_path}
			alt={movieDetails.title}
		/>
	</div>
</div>

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

<h2 class="my-10 italic">{movieDetails.tagline}</h2>

<h3 class="text-xl font-semibold tracking-tight text-slate-300">Overview</h3>
<p class="my-2 max-w-4xl text-sm">{movieDetails.overview}</p>

<div class="my-12 flex gap-8">
	{#if crew.samePerson}
		<div>
			<p class="font-medium tracking-tight text-slate-300">{crew.director}</p>
			<p class="text-sm">Director, Writer</p>
		</div>
	{:else}
		{#if crew.director}
			<div>
				<p class="font-medium tracking-tight text-slate-300">{crew.director}</p>
				<p class="text-sm">Director</p>
			</div>
		{/if}

		{#if crew.writer}
			<div>
				<p class="font-medium tracking-tight text-slate-300">{crew.writer}</p>
				<p class="text-sm">Writer</p>
			</div>
		{/if}
	{/if}
</div>

<!-- <div class="mt-8 text-sm font-medium">
	{#await streamed.external_ids then external_ids}
		<a href={`https://www.imdb.com/title/${external_ids.imdb_id}/`} target="_blank">See on IMDB</a>
	{/await}

	<div>
		{#if watchProviders.results.NO}
			<WatchProvider {watchProviders} />
		{/if}
	</div>
</div> -->

<div class="divider" />

<section class="mb-6">
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

<Section id="stats">
	<div class="stats w-full justify-center shadow">
		<div class="stat">
			<div class="stat-figure text-primary">
				<StatIcon />
			</div>
			<div class="stat-title">Budget</div>
			<div class="stat-value text-primary">{formatNumber($budget)}</div>
			<div class="stat-desc">21% more than last month</div>
		</div>

		<div class="stat">
			<div class="stat-figure text-secondary">
				<StatIcon icon="banknotes" />
			</div>
			<div class="stat-title">Revenue</div>
			<div class="stat-value text-secondary">{formatNumber($revenue)}</div>
			<div class="stat-desc">21% more than last month</div>
		</div>

		<div class="stat">
			<div class="stat-figure text-accent">
				<StatIcon icon="date" />
			</div>
			<div class="stat-title">Status</div>
			<div class="stat-value text-accent">{movieDetails.status}</div>
			<div class="stat-desc">{formatDate(movieDetails.release_date)}</div>
		</div>
	</div></Section
>

{#if movieDetails.belongs_to_collection}
	<Section>
		<div class="relative h-72 w-full overflow-hidden rounded-lg">
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
		</div>
	</Section>
{/if}

<div id="recommendations">
	{#await streamed.recommendations then recommendations}
		{#if recommendations.length}
			<Section title="Recommendations">
				<ul id="listContainer" class="grid grid-cols-8 gap-x-5">
					{#each recommendations.slice(0, 8) as movie}
						{#if movie.poster_path}
							<li>
								<Card data={movie} />
							</li>
						{/if}
					{/each}
				</ul>
			</Section>
		{/if}
	{/await}
</div>
