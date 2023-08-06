<script lang="ts">
	import { Moon, Sun } from '$icons'
	import { createSwitch, melt } from '@melt-ui/svelte'
	import { fly } from 'svelte/transition'

	const {
		elements: { root },
		states: { checked }
	} = createSwitch()

	$: console.log($checked)
</script>

<div class="h-16 w-full bg-neutral">
	<div class="mx-auto flex h-full max-w-8xl items-center justify-end px-4">
		<form data-sveltekit-noscroll>
			<div class="flex items-center">
				<label class="pr-4 leading-none text-white" for="airplane-mode" />

				<button
					use:melt={$root}
					class="relative h-fit cursor-pointer overflow-hidden"
					id="airplane-mode"
				>
					{#key $checked}
						<div
							in:fly={{ y: 40, delay: 150, opacity: 1 }}
							out:fly={{ y: -40, duration: 300, opacity: 0 }}
						>
							{#if $checked}
								<Sun />
							{:else}
								<Moon />
							{/if}
						</div>
					{/key}
				</button>
			</div>
		</form>
	</div>
</div>
