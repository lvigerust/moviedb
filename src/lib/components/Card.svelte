<script lang="ts">
	import { slugify } from '$functions'
	import type { Movie, Show } from '$types'

	export let data: Movie | Show

	let media_type: string
	if (data.title) {
		media_type = 'movie'
	} else media_type = 'tv'
</script>

<a
	href={`/${media_type}/${data.id}-${slugify(data.title || data.name)}`}
	title={data.title || data.name}
	class="cursor-pointer overflow-hidden rounded-md shadow outline outline-transparent transition-all duration-300 hover:scale-105 hover:outline-slate-700"
>
	<img
		class="h-full w-full object-cover"
		src={'https://image.tmdb.org/t/p/w500/' + data.poster_path}
		alt={data.title || data.name}
	/>
</a>
