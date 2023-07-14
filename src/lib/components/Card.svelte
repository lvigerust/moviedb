<script lang="ts">
	import { slugify } from '$functions'

	export let data: Movie | Show

	let mediaType: string

	if (data.title) {
		mediaType = 'movie'
	} else mediaType = 'tv'
</script>

<a
	href={`/${mediaType}/${data.id}-${slugify(data.title || data.name)}`}
	title={data.title}
	class="cursor-pointer overflow-hidden rounded-md shadow outline outline-transparent transition-all duration-300 hover:scale-105 hover:outline-slate-700"
>
	<img
		class="h-full w-full object-cover"
		src={'https://image.tmdb.org/t/p/w500/' + data.poster_path}
		alt={data.title || data.name}
	/>
</a>
