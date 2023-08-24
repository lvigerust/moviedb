<script lang="ts">
	import { createCollapsible, melt } from '@melt-ui/svelte'
	import { slide } from 'svelte/transition'
	import { Plus } from '$icons'

	const {
		elements: { root, content, trigger },
		states: { open }
	} = createCollapsible()
</script>

<div use:melt={$root} class="mx-auto w-[18rem] max-w-full sm:w-[25rem]">
	<button use:melt={$trigger}>
		<div class="my-2 rounded-lg bg-white p-3 shadow">
			<span class="text-base text-black">melt-ui/melt-ui</span>
		</div>
	</button>

	{#if $open}
		<div use:melt={$content} transition:slide>
			<div class="flex flex-col gap-2">
				<div class="rounded-lg bg-white p-3 shadow">
					<span class="text-base text-black">sveltejs/svelte</span>
				</div>
				<div class="rounded-lg bg-white p-3 shadow">
					<span class="text-base text-black">sveltejs/kit</span>
				</div>
			</div>
		</div>
	{/if}
</div>

<style lang="postcss">
	.abs-center {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}
</style>
