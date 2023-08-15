<script lang="ts">
	import type { Credit, CreditMedia, Movie, Show } from '$types'
	import { slugify } from '$utils'

	export let data: Movie | Show | CreditMedia

	function cardTitle(data: Movie | Show | CreditMedia) {
		if ('name' in data) {
			return data.name
		}

		if ('department' in data) {
			return data.title || data.name
		}

		return data.title
	}
</script>

<a
	href={`/${data.media_type}/${data.id}-${slugify(cardTitle(data) ?? '')}`}
	title={cardTitle(data)}
>
	<div
		class="h-full overflow-hidden rounded-md shadow-lg shadow-black/30 outline outline-transparent transition-all duration-300 hover:scale-105 sm:hover:outline-slate-500/25 xl:rounded-lg"
	>
		<img
			class="h-full w-full object-cover"
			src={'https://image.tmdb.org/t/p/w500/' + data.poster_path}
			alt={cardTitle(data)}
		/>
	</div>
</a>
