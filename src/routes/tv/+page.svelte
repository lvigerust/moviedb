<script lang="ts">
	import { Card } from '$components'

	export let data

	const {
		popularShows: { results }
	} = data
</script>

<h1 class="my-12 text-center font-Display text-6xl">TV Shows</h1>

<div class="grid grid-flow-row grid-cols-7 gap-x-4 gap-y-12">
	{#each results as movie}
		<Card data={movie} />
	{/each}
</div>
