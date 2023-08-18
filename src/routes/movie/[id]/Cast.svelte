<script lang="ts">
	import type { Credits } from '$types'
	import { slugify } from '$utils'

	export let movieCredits: Promise<Credits>
</script>

{#await movieCredits}
	<p>Loading credits...</p>
{:then movieCredits}
	<section id="cast" class="mb-6">
		<div class="mb-6 flex items-center justify-between">
			<a class="text-2xl font-semibold tracking-tight text-slate-300" href={'#'}>Top Billed Cast</a>
			<a class="text-sm hover:underline" href={'#'}>Full Cast & Crew</a>
		</div>

		<div class="grid grid-flow-col place-content-evenly gap-4 px-2">
			{#each movieCredits.cast.slice(0, 6) as cast}
				<a href={`/person/${cast.id}-${slugify(cast.name)}`} class="group flex items-center gap-2">
					<div class="avatar">
						<div class="duration-400 w-16 rounded-full transition-transform group-hover:scale-105">
							<img src={`https://images.tmdb.org/t/p/w185/${cast.profile_path}`} alt={cast.name} />
						</div>
					</div>
					<div class="text-sm">
						<p class="font-bold text-slate-300">{cast.name}</p>
						<p class="">{cast.character}</p>
					</div>
				</a>
			{/each}
		</div>
	</section>
{/await}
