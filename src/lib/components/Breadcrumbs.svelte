<script lang="ts">
	import { page } from '$app/stores'
	import { slugify } from '$functions'

	$: route = $page.route.id
</script>

<div class="breadcrumbs my-2 flex h-12 justify-center py-2 text-sm">
	<ul>
		<li><a href="/">Home</a></li>

		{#if route?.includes('movie')}
			<li><a href="/movie">Movies</a></li>

			{#if $page.data.movieDetails}
				<li>
					<a href={`/movie/${$page.data.movieDetails.id}-${slugify($page.data.movieDetails.title)}`}
						>{$page.data.movieDetails.title}</a
					>
				</li>
			{/if}
		{:else if route?.includes('tv')}
			<li><a href="/tv">TV Shows</a></li>

			{#if $page.data.showDetails}
				<li>
					<a href={`/tv/${$page.data.showDetails.id}-${slugify($page.data.showDetails.name)}`}
						>{$page.data.showDetails.name}</a
					>
				</li>
			{/if}
		{/if}
	</ul>
</div>
