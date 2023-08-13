<script lang="ts">
	import type { ProviderOptions, WatchProvider } from '../../routes/tv/[id]/+page.server'

	export let watchProviders: ProviderOptions
	const href = watchProviders.link
	let message: string

	function getProvider(watchProviders: ProviderOptions) {
		if (watchProviders.flatrate) {
			message = 'Stream'
			return watchProviders.flatrate[0]
		} else if (watchProviders.buy) {
			message = 'Buy'
			return watchProviders.buy[0]
		}
	}

	const provider: WatchProvider | undefined = getProvider(watchProviders)
</script>

<a {href} target="_blank" rel="noreferrer">
	<div class="flex flex-col justify-center gap-2">
		<div class="flex items-center justify-between gap-2">
			<div class="logo">
				<img
					class="h-10 w-10 rounded-md"
					src={'http://image.tmdb.org/t/p/w500/' + provider?.logo_path}
					alt={provider?.provider_name}
				/>
			</div>
			<div class="text-start text-xs">
				<p>{message}</p>
				<p class="font-bold">{provider?.provider_name}</p>
			</div>
		</div>
		<p class="text-center text-[8px] tracking-wide">Provided by JustWatch</p>
	</div>
</a>
