<script lang="ts">
	import { createTooltip, melt } from '@melt-ui/svelte'
	import { fade } from 'svelte/transition'

	const {
		elements: { trigger, content, arrow },
		states: { open }
	} = createTooltip({
		positioning: {
			placement: 'right'
		},
		openDelay: 500,
		closeDelay: 50,
		closeOnPointerDown: false,
		forceVisible: true
	})
</script>

<div use:melt={$trigger}>
	<slot />
</div>

{#if $open}
	<div
		use:melt={$content}
		transition:fade={{ duration: 100 }}
		class="z-10 rounded-md bg-slate-800 shadow-sm"
	>
		<div use:melt={$arrow} />
		<p class="px-4 py-1 text-base-content/75">Norsk aldersgrense</p>
	</div>
{/if}
