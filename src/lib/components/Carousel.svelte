<script lang="ts">
	import { Splide, SplideSlide } from '@splidejs/svelte-splide'
	import type { MovieDetails } from '$types'
	import '@splidejs/svelte-splide/css'

	export let slides: MovieDetails[]

	let options = {
		pagination: false,
		arrows: false,
		padding: '22rem',
		gap: '2rem',
		type: 'loop'
	}
</script>

<Splide {options} aria-label="My Favorite Images">
	{#each slides as slide}
		<SplideSlide
			class="mb-8 mt-4 overflow-hidden rounded-xl shadow-xl shadow-black/20 outline outline-transparent transition-all duration-200 sm:hover:scale-[101.5%] sm:hover:outline-slate-500/25"
		>
			<a href={`/movie/${slide.id}`}>
				<div class="relative">
					<img
						class="max-h-[480px] w-full object-cover"
						src={'https://image.tmdb.org/t/p/original/' + slide.backdrop_path}
						alt={slide.title}
					/>

					<div
						class="absolute bottom-0 flex h-1/2 w-full items-end justify-between bg-gradient-to-t from-black/60 px-12 pb-8"
					>
						<button class="btn btn-ghost rounded-full normal-case text-slate-100 bg-blend-darken"
							>{slide.tagline}</button
						>
						{#if slide.images && slide.images.logos}
							<img
								class="mb-8 mr-8 h-fit max-h-32 max-w-[40%] object-contain"
								src={'https://image.tmdb.org/t/p/w500/' + slide.images.logos[0].file_path}
								alt=""
							/>
						{/if}
					</div>
				</div>
			</a>
		</SplideSlide>
	{/each}
</Splide>
