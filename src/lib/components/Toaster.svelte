<script lang="ts" context="module">
	export type ToastData = {
		title: string
		description: string
	}

	const {
		elements: { content, title, description },
		helpers,
		states: { toasts },
		actions: { portal }
	} = createToaster<ToastData>()

	export const addToast = helpers.addToast
</script>

<script lang="ts">
	import { createToaster, melt } from '@melt-ui/svelte'
	import { flip } from 'svelte/animate'
	import { fly } from 'svelte/transition'
	import { backIn, backOut } from 'svelte/easing'
</script>

<div class="fixed bottom-0 right-0 z-40 m-5 flex flex-col items-end gap-2" use:portal>
	{#each $toasts as { id, data } (id)}
		<div animate:flip={{ duration: 600 }}>
			<div
				use:melt={$content(id)}
				in:fly|global={{ duration: 600, x: '100%', easing: backOut }}
				out:fly={{ duration: 600, x: '100%', easing: backIn }}
				class="flex flex-col gap-y-2 rounded-xl border border-slate-400/10 bg-slate-500/20 px-6 py-4 text-slate-400 shadow-md backdrop-blur"
			>
				<h3 use:melt={$title(id)} class="flex items-center gap-3 font-semibold capitalize">
					{data.title}
					<span
						class="aspect-square w-2 rounded-full {data.title === 'success'
							? 'bg-lime-500'
							: 'bg-red-500'}"
					/>
				</h3>
				<p use:melt={$description(id)} class="text-sm">
					{@html data.description}
				</p>
			</div>
		</div>
	{/each}
</div>
