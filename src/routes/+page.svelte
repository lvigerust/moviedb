<script lang="ts">
	import { Carousel } from '$components'

	export let data

	const {
		watchlist: { watchlist }
	} = data
</script>

<Carousel slides={watchlist} />

<div class="mt-8">
	<h1 class="max-w-4xl font-Display text-5xl font-medium tracking-tight text-slate-200 sm:text-7xl">
		Welcome to <span class="whitespace-nowrap">
			<a href="/settings" class="whitespace-nowrap text-blue-700">Filmguide</a>
		</span>
	</h1>
	<h2 class="mt-4 text-xl font-medium leading-6">
		Millions of <a class="hover:text-blue-300" href="/movie">movies</a>,
		<a class="hover:text-blue-300" href="/tv">TV Shows</a>
		and people to discover. Explore
		<span class="italic">now</span>.
	</h2>
</div>
