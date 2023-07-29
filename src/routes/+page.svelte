<script lang="ts">
	import { Carousel } from '$components'

	export let data

	const {
		stinkmeanersPicks: { movies }
	} = data
</script>

<Carousel slides={movies} />

<p class="px-56 text-end text-xs font-medium italic tracking-wide text-slate-500">
	Meaner's recommendations
</p>

<div class="mt-6">
	<h1 class="max-w-4xl font-Display text-5xl font-medium tracking-tight text-slate-200 sm:text-7xl">
		Welcome to <span class="whitespace-nowrap">
			<span class="whitespace-nowrap text-blue-700">Stinkmeaner's</span>
			database</span
		>
	</h1>
	<h2 class="mt-4 text-xl font-medium leading-6 text-slate-400">
		Millions of <a href="/movie">movies</a>, <a href="/tv">TV Shows</a> and people to discover.
		Explore
		<span class="italic">now</span>.
	</h2>
</div>
