<script lang="ts">
	import { Meta } from '$components'

	export let data

	const { showDetails } = data
</script>

<Meta data={showDetails} />

<img
	class="max-w-2xl"
	src={'https://image.tmdb.org/t/p/w1280/' + showDetails.backdrop_path}
	alt={showDetails.name}
/>

<h1 class="text-4xl">{showDetails.name} ({new Date(showDetails.first_air_date).getFullYear()})</h1>
<h2>{showDetails.tagline}</h2>
