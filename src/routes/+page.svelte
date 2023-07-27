<script lang="ts">
	import { Card } from '$components'

	export let data

	const { stinkmeanersPicks } = data
</script>

<h1 class="my-12 text-center font-Display text-6xl">Stinkmeaner's Picks</h1>

<div class="grid grid-flow-row grid-cols-7 gap-x-6 gap-y-12">
	{#each stinkmeanersPicks as movie}
		<Card data={movie} />
	{/each}
</div>
