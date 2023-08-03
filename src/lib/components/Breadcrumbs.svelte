<script lang="ts">
	import { page } from '$app/stores'
	import { slugify } from '$functions'

	$: route = $page.route.id
</script>

{#if !$page.error}
	<div class="breadcrumbs flex justify-center py-8 text-sm font-medium">
		<ul>
			{#if $page.url.pathname !== '/'}
				<li><a href="/">Home</a></li>
			{/if}

			{#if route?.includes('movie')}
				<li><a href="/movie">Movies</a></li>

				{#if $page.data.movieDetails}
					{#if $page.data.movieDetails.belongs_to_collection}
						<li>
							<a
								href={`/collection/${$page.data.movieDetails.belongs_to_collection.id}-${slugify(
									$page.data.movieDetails.belongs_to_collection.name
								)}`}>{$page.data.movieDetails.belongs_to_collection.name}</a
							>
						</li>
					{/if}

					<li>
						<a
							href={`/movie/${$page.data.movieDetails.id}-${slugify(
								$page.data.movieDetails.title
							)}`}>{$page.data.movieDetails.title}</a
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
{/if}
