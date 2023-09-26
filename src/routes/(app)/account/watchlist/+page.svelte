<script lang="ts">
	import { enhance } from '$app/forms'
	import { Card } from '$components'
	import { createWatchlistStore } from '$lib/watchlist-store.js'
	import { flip } from 'svelte/animate'
	import { quintOut } from 'svelte/easing'
	import { fly, scale } from 'svelte/transition'

	export let data

	const {
		watchlistMovies: { results }
	} = data

	export const myWatchlist = createWatchlistStore(results)
</script>

<main class="py-8">
	<h2 class="mb-3 text-lg font-semibold tracking-tighter">Watchlist movies</h2>
	<div class="grid grid-flow-row grid-cols-7 gap-x-4 gap-y-16">
		{#each $myWatchlist as movie, index (movie.id)}
			<div
				animate:flip={{ duration: 500, easing: quintOut }}
				in:fly|global={{ y: 50, delay: 300 + index * 50 }}
				out:scale={{ duration: 500 }}
			>
				<Card data={movie} />

				<form
					class="flex justify-center"
					method="POST"
					action="?/removeFromWatchlist"
					use:enhance={() => {
						// Before form submission to server

						return async ({ result }) => {
							// After form submission to server
							if (result.type === 'success') {
								myWatchlist.removeFromWatchList(movie.id)
							}
						}
					}}
				>
					<input name="id" value={movie.id} type="number" hidden />
					<button
						class="mt-4 w-fit text-sm font-medium text-slate-600 transition-colors hover:text-slate-400"
						>Remove</button
					>
				</form>
			</div>
		{/each}
	</div>
</main>
