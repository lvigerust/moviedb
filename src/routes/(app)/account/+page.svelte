<script lang="ts">
	import { Card } from '$components'

	export let data

	const {
		watchlistMovies: { results }
	} = data
</script>

<h2 class="mb-3 text-lg font-semibold tracking-tighter">Watchlist Movies</h2>
<div class="grid grid-flow-row grid-cols-7 gap-x-4 gap-y-10">
	{#each results as movie}
		<Card data={movie} />
	{/each}
</div>
