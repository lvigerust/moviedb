<script lang="ts">
	import { Card, Carousel } from '$components'
	import { slugify } from '$functions'

	export let data

	const { popularMovies, genres } = data
</script>

<Carousel slides={popularMovies} />

<div class="flex flex-wrap justify-center gap-3 pb-6 pt-5">
	{#each genres.slice(0, 8) as genre}
		<a
			href={`/movie/genre/${genre.id}-${slugify(genre.name)}`}
			class="rounded-box cursor-pointer bg-slate-800/10 px-4 py-1 text-sm normal-case text-slate-400/75 outline outline-1 outline-slate-800/75 transition-all hover:text-slate-400 hover:outline-slate-600/80"
		>
			{genre.name}
		</a>
	{/each}
</div>

<h2 class="mb-3 text-lg font-semibold tracking-tighter">Popular Movies</h2>
<div class="grid grid-flow-row grid-cols-7 gap-x-4 gap-y-12">
	{#each popularMovies as movie}
		<Card data={movie} />
	{/each}
</div>
