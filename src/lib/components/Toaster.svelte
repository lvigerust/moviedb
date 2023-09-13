<script lang="ts" context="module">
	export type ToastData = {
		description: string
	}

	const {
		elements: { content, description },
		helpers,
		states: { toasts },
		actions: { portal }
	} = createToaster<ToastData>()

	export const addToast = helpers.addToast
</script>

<script lang="ts">
	import { createToaster, melt } from '@melt-ui/svelte'
	import { flip } from 'svelte/animate'
	import { backIn, backOut } from 'svelte/easing'
	import { fly } from 'svelte/transition'
</script>

<div class="fixed bottom-0 right-0 z-40 m-5 flex flex-col items-end gap-2" use:portal>
	{#each $toasts as { id, data } (id)}
		<div
			use:melt={$content(id)}
			animate:flip={{ duration: 500 }}
			in:fly|global={{ duration: 600, x: '100%', easing: backOut }}
			out:fly={{ duration: 600, x: '100%', easing: backIn }}
			class="flex items-center gap-8 rounded-xl border border-slate-400/10 bg-slate-500/20 px-6 py-4 text-slate-400 shadow-md backdrop-blur"
		>
			<p use:melt={$description(id)} class="text-sm">
				{@html data.description}
			</p>
		</div>
	{/each}
</div>
