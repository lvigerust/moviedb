<script lang="ts">
	import { Splide, SplideSlide } from '@splidejs/svelte-splide'
	import '@splidejs/svelte-splide/css'
	import type { Movie, MovieDetails, Show } from '$types'
	import { slugify } from '$utils'

	export let slides: (Movie | MovieDetails | Show)[]

	function title(slide: Movie | MovieDetails | Show) {
		if ('title' in slide) {
			return slide.title
		} else return slide.name
	}

	function slideCTA(slide: Movie | MovieDetails | Show) {
		if ('title' in slide) {
			if ('tagline' in slide) {
				return slide.tagline
			}
			return slide.title
		} else return slide.name
	}

	function slideLogo(slide: Movie | MovieDetails | Show) {
		if ('images' in slide) {
			return slide.images?.logos[0].file_path
		}
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

<Splide {options} class="ml-[calc(-50vw+50%)] w-screen" aria-label="Filmguide's Top Picks">
	{#each slides as slide}
		<SplideSlide>
			<a
				class="relative mb-8 mt-2 inline-block w-full overflow-hidden rounded-xl shadow-xl shadow-black/20 outline outline-transparent transition-all duration-300 sm:hover:scale-[101.5%] sm:hover:outline-slate-500/25"
				href={`/${slide.media_type}/${slide.id}-${slugify(title(slide))}`}
			>
				<img
					class="max-h-[420px] w-full object-cover"
					src={`https://image.tmdb.org/t/p/original/${slide.backdrop_path}`}
					alt=""
				/>

				<div
					class="absolute bottom-0 flex h-1/2 w-full items-end justify-between rounded-b-xl bg-gradient-to-t from-black/60 px-12 pb-8"
				>
					<div class="btn btn-ghost rounded-full normal-case text-slate-200">
						{slideCTA(slide)}
					</div>

					<div class="mx-8 basis-1/3">
						<img src={`https://image.tmdb.org/t/p/original/${slideLogo(slide)}`} alt="" />
					</div>
				</div>
			</a>
		</SplideSlide>
	{/each}
</Splide>
