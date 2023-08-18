<script lang="ts">
	import { Card, Meta } from '$components'
	import { onMount } from 'svelte'
	import { inView, stagger, timeline, type TimelineDefinition } from 'motion'
	import Details from './Details.svelte'
	import Cast from './Cast.svelte'
	import Stats from './Stats.svelte'
	import Collection from './Collection.svelte'

	export let data

	const {
		movieDetails,

		streamed: { movieCredits, watchProviders, recommendations, external_ids }
	} = data

	let sequence: TimelineDefinition

	onMount(() => {
		sequence = [
			[
				'#recommendations > ul > li, #recommendations > h2 ',
				{ y: [75, 0], opacity: [0, 1] },
				{ delay: stagger(0.05), duration: 0.8, easing: 'ease' }
			]
		]

		inView('#recommendations', () => {
			timeline(sequence)
		})
	})
</script>

<Meta data={movieDetails} />

<Details {movieDetails} {watchProviders} {movieCredits} />

<div class="divider" />

<Cast {movieCredits} />

<div class="divider" />

<Stats {movieDetails} />

<Collection {movieDetails} />

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
