<script lang="ts">
	import { Moon, Sun } from '$icons'
	import { createToggle } from '@melt-ui/svelte'

	const { toggle } = createToggle()
</script>

<div class="w-full bg-neutral py-4">
	<div class="mx-auto flex max-w-8xl justify-end px-4">
		<button melt={$toggle} aria-label="Toggle italic" class="btn btn-circle btn-ghost btn-sm p-1">
			{#if $toggle['data-state'] === 'on'}
				<Sun />
			{:else}
				<Moon />
			{/if}
		</button>
	</div>
</div>
