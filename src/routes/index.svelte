<script context="module">
	let envVar = import.meta.env.VITE_API;

	export async function load({ fetch }) {
		const res = await fetch(
			`https://api.themoviedb.org/3/movie/popular?api_key=${envVar}&language=en-US&page=1`
		);
		const data = await res.json();

		if (res.ok) {
			return {
				props: { popularMovies: data.results }
			};
		}
	}
</script>

<script>
	export let popularMovies;
	import PopularMovies from '../components/PopularMovies.svelte';
	import { fly, fade } from 'svelte/transition';
	import { transitionStores } from '../stores/transitionStores';
</script>

<svelte:head>
	<title>Stinkmeaner Inc.</title>
</svelte:head>

<section
	in:fly={{ y: $transitionStores.direction, delay: $transitionStores.duration }}
	out:fade={{ duration: $transitionStores.duration }}
>
	<PopularMovies {popularMovies} />
</section>
