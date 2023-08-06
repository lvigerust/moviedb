<script lang="ts">
	import { Card, Meta } from '$components'
	import { formatDate } from '$utils'
	import { fly } from 'svelte/transition'

	export let data

	const { person, streamed } = data
</script>

<Meta data={person} />

<div class="w-full pt-8">
	<div class="flex items-center justify-center gap-4">
		<div class="avatar">
			<div class="w-32 rounded-full">
				<img src={`https://images.tmdb.org/t/p/w185/${person.profile_path}`} alt={person.name} />
			</div>
		</div>
		<div>
			<h1 class="text-2xl font-semibold tracking-tight">
				{person.name}
			</h1>
		</div>
	</div>
</div>

<div class="grid grid-flow-col justify-center p-8">
	<div class="">
		<hgroup>
			<h3 class="font-semibold leading-7">Known for</h3>
			<p class="text-sm tracking-wide">{person.known_for_department}</p>
		</hgroup>

		<hgroup class="mt-4">
			<h3 class="font-semibold leading-7">Gender</h3>
			<p class="text-sm tracking-wide">
				{#if person.gender === 2}
					Male
				{:else}
					Female
				{/if}
			</p>
		</hgroup>

		<hgroup class="mt-4">
			<h3 class="font-semibold leading-7">Birthday</h3>
			<p class="text-sm tracking-wide">{formatDate(person.birthday)}</p>
		</hgroup>

		<hgroup class="mt-4">
			<h3 class="font-semibold leading-7">Place of Birth</h3>
			<p class="text-sm tracking-wide">{person.place_of_birth}</p>
		</hgroup>
	</div>

	<div class="divider divider-horizontal" />

	<div class="line-clamp-5">
		<h2 class=" mb-3 text-xl font-bold tracking-tight">Biography</h2>
		<p class="max-w-2xl text-sm">{person.biography}</p>
	</div>
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
