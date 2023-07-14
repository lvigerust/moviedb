<script lang="ts">
	import { Card } from '$components'

	export let data

	const { popularShows } = data
</script>

<h1 class="my-12 text-center font-Display text-6xl">TV Shows</h1>

<div class="grid grid-flow-row grid-cols-7 gap-x-6 gap-y-12">
	{#each popularShows as movie}
		<Card data={movie} />
	{/each}
</div>
