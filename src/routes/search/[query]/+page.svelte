<script lang="ts">
	import { Card } from '$components'
	import { fade, fly } from 'svelte/transition'

	export let data

	let {
		searchResults: { movies, shows, moviesFirst }
	} = data

	const staggerSpeed = 50
	let showsDelay = 300 + staggerSpeed * movies.length
	let moviesDelay = 300

	if (!moviesFirst) {
		showsDelay = 300
		moviesDelay = 300 + staggerSpeed * shows.length
	}
</script>

<div class="flex {moviesFirst ? 'flex-col' : 'flex-col-reverse'}">
	<div class="section">
		<h2 in:fly={{ y: 50, delay: moviesDelay }} class="my-4 text-3xl font-semibold tracking-tight">
			Movies
		</h2>
		<div class="grid grid-flow-row grid-cols-7 gap-x-6 gap-y-12 pb-4">
			{#each movies as movie, index}
				<div in:fly|global={{ y: 50, delay: moviesDelay + 50 + index * staggerSpeed }}>
					<Card data={movie} />
				</div>
			{/each}
		</div>
	</div>

	{#if movies.length && shows.length}
		<div
			in:fade|global={{
				delay: moviesFirst ? movies.length * staggerSpeed + 700 : shows.length * staggerSpeed + 700
			}}
			class="divider mt-8"
		/>
	{/if}

	<div class="section">
		<h2 in:fly={{ y: 50, delay: showsDelay }} class="my-4 text-3xl font-semibold tracking-tight">
			TV Shows
		</h2>
		<div class="grid grid-flow-row grid-cols-7 gap-x-6 gap-y-12 pb-4">
			{#each shows as show, index}
				<div in:fly|global={{ y: 50, delay: showsDelay + 50 + index * staggerSpeed }}>
					<Card data={show} />
				</div>
			{/each}
		</div>
	</div>
</div>
