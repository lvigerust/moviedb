<script lang="ts">
	import { Meta } from '$components'
	import Details from './Details.svelte'
	import Cast from './Cast.svelte'
	import Stats from './Stats.svelte'
	import Collection from './Collection.svelte'
	import Recommendations from './Recommendations.svelte'

	export let data

	const {
		movieDetails,

		streamed: { movieCredits, watchProviders, recommendations, release_dates, external_ids }
	} = data
</script>

<Meta />

<Details {movieDetails} {watchProviders} {movieCredits} {release_dates} />

<div class="divider" />

<Cast {movieCredits} />

<div class="divider" />

<Stats {movieDetails} />

<Collection {movieDetails} />

<Recommendations {recommendations} />
