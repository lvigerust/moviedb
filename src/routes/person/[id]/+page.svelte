<script lang="ts">
	import { Card } from '$components'
	import { dynamicSort } from '$functions'

	export let data

	const { person, personMovieCredits } = data

	const topMovies = personMovieCredits.cast.sort(dynamicSort('-popularity')).slice(0, 7)

	let lines = ''

	function removeLines() {
		if (lines) {
			lines = ''
		} else lines = 'line-clamp-none'
	}
</script>

<div class="w-full text-center">
	<div class="flex items-center justify-center gap-4">
		<div class="avatar">
			<div class="w-28 rounded-full">
				<img src={`https://images.tmdb.org/t/p/w185/${person.profile_path}`} alt={person.name} />
			</div>
		</div>
		<div>
			<h1 class="text-2xl font-semibold tracking-tight">
				{person.name}
			</h1>

			<h3 class="text-lg tracking-tight text-slate-400/80">{person.also_known_as[0]}</h3>
		</div>
	</div>
	<div class="mx-auto mt-8 max-w-5xl">
		<p class="line-clamp-4 {lines} whitespace-break-spaces tracking-tight">
			{person.biography}
		</p>

		<button class="btn btn-primary btn-sm mt-4 normal-case" on:click={removeLines}
			>{lines === '' ? 'Read more' : 'Close'}</button
		>
	</div>
</div>

<div class="divider" />

<h1 class="mb-6 text-center text-3xl font-semibold tracking-tight">Known For</h1>

<div class="grid grid-flow-row grid-cols-7 gap-x-6 gap-y-12">
	{#each topMovies as movie}
		<Card data={movie} />
	{/each}
</div>
