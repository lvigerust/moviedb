<script lang="ts">
	import { slugify } from '$functions'

	export let data: Movie
</script>

<a
	href={`/movie/${data.id}-${slugify(data.title)}`}
	title={data.title}
	class="rounded-md overflow-hidden shadow hover:outline-slate-700 hover:scale-105 duration-300 outline outline-transparent cursor-pointer transition-all"
>
	<img src={'https://image.tmdb.org/t/p/w500/' + data.poster_path} alt={data.title} />
</a>
