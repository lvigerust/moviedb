<script lang="ts" context="module">
	export type ToastData = {
		title: string
		description: string
		color: string
	}

	const {
		elements: { content, description, close },
		helpers,
		states: { toasts },
		actions: { portal }
	} = createToaster<ToastData>()

	export const addToast = helpers.addToast
</script>

<script lang="ts">
	import { afterNavigate } from '$app/navigation'

	import { createToaster, melt } from '@melt-ui/svelte'
	import { flip } from 'svelte/animate'
	import { backIn, backOut } from 'svelte/easing'
	import { fly } from 'svelte/transition'

	let visible = false
	let delay: number

	afterNavigate(({ from }) => {
		delay = from === null ? 2000 : 0
		visible = true
	})
</script>

{#if visible}
	<div class="fixed bottom-0 right-0 z-40 m-5 flex flex-col items-end gap-2" use:portal>
		{#each $toasts as { id, data } (id)}
			<div
				use:melt={$content(id)}
				animate:flip={{ duration: 500 }}
				in:fly|global={{ duration: 600, x: '100%', delay, easing: backOut }}
				out:fly={{ duration: 600, x: '100%', easing: backIn }}
				class="w-[350px] rounded-xl border border-slate-400/10 bg-slate-500/20 py-4 pl-6 pr-8 shadow-md backdrop-blur"
			>
				<div use:melt={$description(id)}>
					<p class="flex items-center gap-3 text-sm font-medium leading-7 text-slate-300/80">
						{@html data.description}
					</p>
				</div>
			</div>
		{/each}
	</div>
{/if}
