<script lang="ts">
	import { Card, Carousel } from '$components'

	export let data

	const {
		popularShows: { results }
	} = data
</script>

<Carousel slides={results} />

<h2 class="mb-3 text-lg font-semibold tracking-tighter">Popular TV Shows</h2>
<div class="grid grid-flow-row grid-cols-7 gap-x-4 gap-y-12">
	{#each results as movie}
		<Card data={movie} />
	{/each}
</div>
