<script lang="ts">
	import { createDialog, melt } from '@melt-ui/svelte'
	import { MagnifyingGlass } from '$icons'
	import { goto } from '$app/navigation'
	import { fade } from 'svelte/transition'

	const {
		elements: { trigger, overlay, content, portalled },
		states: { open }
	} = createDialog()

	let searchQuery: string

	const submitSearch = async () => {
		if (searchQuery !== undefined || '') {
			goto('/search/' + searchQuery)
			$open = false
			searchQuery = ''
		}
	}

	function onKeyDown(event: KeyboardEvent) {
		if (event.key === '.' && (event.metaKey || event.ctrlKey)) {
			$open = true
		}
	}
</script>

<svelte:window on:keydown={onKeyDown} />

<button
	use:melt={$trigger}
	class="btn btn-circle btn-ghost btn-sm p-1 hover:text-slate-300 focus:bg-slate-500/10 focus:outline-slate-500/40"
>
	<MagnifyingGlass />
</button>

<div use:melt={$portalled}>
	{#if $open}
		<div
			in:fade={{ duration: 200 }}
			out:fade={{ duration: 150 }}
			use:melt={$overlay}
			class="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur"
		/>
		<div
			in:fade={{ duration: 200, delay: 150 }}
			out:fade={{ duration: 150 }}
			class="fixed left-[50%] top-[27.5%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] px-4"
			use:melt={$content}
		>
			<div class="overflow-hidden rounded-full bg-slate-100 shadow-lg">
				<form on:submit|preventDefault={submitSearch} class="relative">
					<input
						bind:value={searchQuery}
						type="text"
						autocomplete="off"
						placeholder="Search for movies, TV shows or people..."
						class="block w-full appearance-none bg-transparent py-4 pl-7 pr-12 text-base text-slate-900 placeholder:text-slate-600 focus:outline-none sm:text-sm sm:leading-6"
					/>
				</form>
			</div>
			<p class="mt-4 w-full text-center text-sm font-medium text-slate-200/90">
				Enter to search or click anywhere to close
			</p>
		</div>
	{/if}
</div>
