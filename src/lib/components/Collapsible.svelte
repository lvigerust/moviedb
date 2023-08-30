<script lang="ts">
	import type { MovieDetails, ReleaseDate } from '$types'
	import { formatDate } from '$utils'
	import { createCollapsible, melt } from '@melt-ui/svelte'
	import { slide } from 'svelte/transition'

	function clickOutside(node: HTMLElement, handler: () => void): { destroy: () => void } {
		const onClick = (event: MouseEvent) =>
			node && !node.contains(event.target as HTMLElement) && !event.defaultPrevented && handler()

		document.addEventListener('click', onClick, true)

		return {
			destroy() {
				document.removeEventListener('click', onClick, true)
			}
		}
	}

	function handleClickOutside() {
		$open = false
	}

	const {
		elements: { root, content, trigger },
		states: { open }
	} = createCollapsible()

	export let release_dates: ReleaseDate | null
	export let movieDetails: MovieDetails

	const local_release = release_dates?.release_dates[0].release_date
	const global_release = movieDetails.release_date
</script>

{#if local_release}
	<div use:melt={$root} class="relative" use:clickOutside={handleClickOutside}>
		<button use:melt={$trigger}>
			<p>{formatDate(local_release)} ({release_dates?.iso_3166_1})</p>
		</button>

		{#if $open}
			<div
				class="absolute rounded bg-slate-900 p-2 pl-0 text-base-content/75"
				use:melt={$content}
				transition:slide
			>
				<p class="whitespace-nowrap">{formatDate(global_release)} (US)</p>
			</div>
		{/if}
	</div>
{:else}
	<p>{formatDate(global_release)}</p>
{/if}
