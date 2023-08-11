<script lang="ts">
	import { Splide, SplideSlide, SplideTrack } from '@splidejs/svelte-splide'
	import '@splidejs/svelte-splide/css'
	import type { Movie, MovieDetails } from '$types'
	import { fly } from 'svelte/transition'
	import { quadOut } from 'svelte/easing'
	import { slugify } from '$utils'

	export let slides: (Movie | MovieDetails)[]

	function slideCTA(slide: Movie | MovieDetails) {
		if ('tagline' in slide) {
			return slide.tagline
		}
		return slide.title
	}
	function slideLogo(slide: Movie | MovieDetails) {
		if ('images' in slide) {
			return slide.images?.logos[0]
		}
		return undefined
	}

	let options = {
		pagination: false,
		arrows: false,
		padding: '16rem',
		gap: '2rem',
		type: 'loop',
		start: 0
	}
</script>

<Splide
	hasTrack={false}
	{options}
	class="ml-[calc(-50vw+50%)] w-screen"
	aria-label="Filmguide's Top Picks"
>
	<SplideTrack class="overflow-visible">
		{#each slides as slide, index}
			<SplideSlide
				id={index}
				class="mb-8 mt-2 overflow-hidden rounded-xl shadow-xl shadow-black/20 outline outline-transparent transition-all duration-200 sm:hover:scale-[101.5%] sm:hover:outline-slate-500/25"
			>
				<a href={`/movie/${slide.id}-${slugify(slide.title)}`}>
					<div class="relative">
						<img
							class="max-h-[420px] w-full object-cover"
							src={'https://image.tmdb.org/t/p/original/' + slide.backdrop_path}
							alt={slide.title}
						/>

						<div
							class="absolute bottom-0 flex h-1/2 w-full items-end justify-between bg-gradient-to-t from-black/60 px-12 pb-8"
						>
							<div class="btn btn-ghost rounded-full normal-case text-slate-200 bg-blend-darken">
								{slideCTA(slide)}
							</div>

							{#if slideLogo(slide)}
								<img
									in:fly|global={{
										x: 50,
										opacity: 0,
										duration: 3000,
										delay: 300,
										easing: quadOut
									}}
									class="mb-4 mr-8 h-fit max-h-32 max-w-[40%] object-contain"
									src={'https://image.tmdb.org/t/p/w500/' + slideLogo(slide)}
									alt=""
								/>
							{/if}
						</div>
					</div>
				</a>
			</SplideSlide>
		{/each}
	</SplideTrack>
</Splide>
