<script lang="ts">
	import { Card, Carousel } from '$components'

	export let data

	const { stinkmeanersPicks } = data
</script>

<div class="absolute left-0 w-full">
	<Carousel slides={stinkmeanersPicks} />

	<div class="mx-auto mt-4 w-full max-w-8xl px-4 lg:px-8">
		<h1
			class="max-w-4xl font-Display text-5xl font-medium tracking-tight text-slate-200 sm:text-7xl"
		>
			Welcome to <span class="whitespace-nowrap">
				<span class="relative whitespace-nowrap text-blue-700">Stinkmeaner's</span>
				database</span
			>
		</h1>
		<h2 class="mt-4 text-xl font-semibold leading-6 text-slate-400">
			Millions of movies, TV shows and people to discover. Explore now.
		</h2>
	</div>
</div>
