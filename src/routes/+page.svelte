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

	<!-- Make this look good -->

	<!-- <div class="mt-8 flex gap-3">
		<button class="btn rounded-lg bg-blue-600 normal-case">Movies</button>
		<button class="btn btn-neutral btn-outline rounded-lg normal-case">TV Shows</button>

		<div class="divider divider-horizontal mx-3 w-0" />

		<Search navButton={false} />
	</div> -->
</div>
