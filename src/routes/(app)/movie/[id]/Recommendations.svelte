<script lang="ts">
	import { Card } from '$components'
	import type { Movie } from '$types'
	import { inView, animate, stagger } from 'motion'
	import { onMount } from 'svelte'

	export let recommendations: Promise<Movie[]>
	onMount(() => {
		inView('#recommendations', () => {
			animate(
				'#recommendations > ul > li, #recommendations > h2',
				{
					y: [75, 0],
					opacity: [0, 1]
				},
				{ delay: stagger(0.05), duration: 0.8, easing: 'ease' }
			)
		})
	})
</script>

<section id="recommendations">
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
