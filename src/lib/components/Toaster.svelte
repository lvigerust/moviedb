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
	import { Check, LightBulb } from '$icons'

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
				class="flex w-[350px] items-center rounded-xl border border-slate-400/10 bg-slate-500/20 px-6 py-4 text-slate-400 shadow-md backdrop-blur"
			>
				<p use:melt={$description(id)} class="text-sm">
					{data.description}
				</p>
				<button
					use:melt={$close(id)}
					class="ml-auto grid place-items-center rounded-full text-slate-400/75 transition-all hover:text-green-300"
				>
					<Check />
				</button>
			</div>
		{/each}
	</div>
{/if}
