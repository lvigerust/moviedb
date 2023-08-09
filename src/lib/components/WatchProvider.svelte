<script lang="ts">
	export let watchProviders

	const href = watchProviders.results.NO?.link
	const providers = watchProviders.results.NO

	let provider: any
	let message: string

	if (providers?.flatrate) {
		provider = providers.flatrate[0]
		message = 'Stream on'
	} else if (providers?.buy) {
		provider = providers.buy[0]
		message = 'Buy on'
	} else if (providers?.rent) {
		provider = providers.rent[0]
		message = 'Rent on'
	}
</script>

<a {href} target="_blank" rel="noreferrer">
	<div class="flex flex-col justify-center gap-2">
		<div class="flex items-center justify-between gap-2">
			<div class="logo">
				<img
					class="h-10 w-10 rounded-md"
					src={'http://image.tmdb.org/t/p/w500/' + provider.logo_path}
					alt={provider.provider_name}
				/>
			</div>
			<div class=" text-start text-xs">
				<p class=" font-light">{message}</p>
				<p class="font-bold">{provider.provider_name}</p>
			</div>
		</div>
		<p class="text-center text-[8px] tracking-wide">Provided by JustWatch</p>
	</div>
</a>
