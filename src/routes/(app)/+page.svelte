<script lang="ts">
	import { Card, Carousel, Search } from '$components'
	import { formatDate } from '$utils'

	export let data
	const {
		watchlist: { watchlist },
		streamed: { upcomingMovies }
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

{#await upcomingMovies}
	<p>Loading upcoming movies...</p>
{:then upcomingMovies}
	<section class="mt-16 w-full pb-12">
		<h2 class="mb-4 text-xl font-semibold text-slate-300">Upcoming Movies</h2>
		<div class="flex h-full gap-8">
			{#each upcomingMovies.results.slice(0, 3) as movie}
				<div class="grid w-full grid-cols-2 gap-4 rounded-lg bg-neutral/25 p-4 shadow-md">
					<img
						class="rounded-md"
						src={'https://image.tmdb.org/t/p/w1280/' + movie.backdrop_path}
						alt=""
					/>

					<div>
						<hgroup class="space-y-2">
							<p class="text-sm font-medium text-slate-400/75">{formatDate(movie.release_date)}</p>
							<h4 class="font-Display font-semibold text-slate-300/75">{movie.title}</h4>
						</hgroup>
					</div>
				</div>
			{/each}
		</div>
	</section>
{/await}
