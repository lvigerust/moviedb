<script lang="ts">
	import { Card } from '$components'
	import { formatDate } from '$utils'
	import { fly } from 'svelte/transition'

	export let data

	const { person, streamed } = data
</script>

<div class="w-full">
	<div class="flex items-center gap-4">
		<div class="avatar">
			<div class="w-32 rounded-full">
				<img src={`https://images.tmdb.org/t/p/w185/${person.profile_path}`} alt={person.name} />
			</div>
		</div>
		<div>
			<h1 class="text-2xl font-semibold tracking-tight">
				{person.name}
			</h1>

			<h3 class="text-sm">Birthday: {formatDate(person.birthday)}</h3>
		</div>
	</div>

	<h2 class="text-xl font-bold">Biography</h2>
	<p class="text-sm">{person.biography}</p>
</div>

<div class="divider" />

<h1 class="mb-6 text-center text-3xl font-semibold tracking-tight">Known For</h1>

{#await streamed.topMovies}
	<div class="flex w-full justify-center">
		<span class="loading loading-ring loading-lg" />
	</div>
{:then topMovies}
	<div class="grid grid-flow-row grid-cols-7 gap-x-6 gap-y-12">
		{#each topMovies as movie, index}
			<div in:fly|global={{ y: 100, opacity: 0, delay: 500 + index * 40 }}>
				<Card data={movie} />
			</div>
		{/each}
	</div>
{/await}
