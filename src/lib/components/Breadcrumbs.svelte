<script lang="ts">
	import { page } from '$app/stores'
	import { slugify } from '$functions'
	import { animate, inView, stagger } from 'motion'
	import { onMount } from 'svelte'

	$: route = $page.route.id

	let visible = true

	$: if ($page.error || route === '/') {
		visible = false
	} else visible = true

	onMount(() => {
		// Stagger recommended movies
		inView('.test', ({ target }) => {
			animate(
				target.querySelectorAll('ul > li'),
				{ y: [15, 0], opacity: [0, 1] },
				{ delay: stagger(0.1, { start: 0.25 }), duration: 0.5, easing: 'ease' }
			)
		})
	})
</script>

<div class="test">
	{#if visible}
		<div class="breadcrumbs flex justify-center py-8 pt-20 text-sm font-medium">
			<ul>
				<li><a href="/">Home</a></li>

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
				{:else if route?.includes('person')}
					<li><a href={'#person'}>People</a></li>

					<li>
						<a href={`/person/${$page.data.person.id}-${slugify($page.data.person.name)}`}
							>{$page.data.person.name}</a
						>
					</li>
				{:else if route?.includes('search')}
					<li><a href={'#search'}>Search</a></li>

					<li><a href={'#search'}>{$page.data.pageTitle}</a></li>
				{/if}
			</ul>
		</div>
	{/if}
</div>
