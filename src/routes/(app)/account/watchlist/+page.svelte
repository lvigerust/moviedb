<script lang="ts">
	import { enhance } from '$app/forms'
	import { Card, addToast } from '$components'

	export let data
	const {
		watchlistMovies: { results }
	} = data

	function createToast(item: string) {
		addToast({
			data: {
				description: `Removed <b>${item}</b> from your watchlist`
			},
			closeDelay: 5000
		})
	}
</script>

<main class="py-8">
	<h2 class="mb-3 text-lg font-semibold tracking-tighter">Watchlist movies</h2>
	<div class="grid grid-flow-row grid-cols-7 gap-x-4 gap-y-16">
		{#each results as movie}
			<div>
				<Card data={movie} />

				<form
					class="flex justify-center"
					method="post"
					action="?/removeFromWatchlist"
					use:enhance={() => {
						// Before form submission to server

						return async ({ result }) => {
							// After form submission to server
							if (result.type === 'success') {
								createToast(movie.title)
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
