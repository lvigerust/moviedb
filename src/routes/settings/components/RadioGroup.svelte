<script lang="ts">
	import { enhance } from '$app/forms'
	import { createRadioGroup, melt } from '@melt-ui/svelte'
	import type { SubmitFunction } from '@sveltejs/kit'
	import { writable } from 'svelte/store'

	const submitUpdateTheme: SubmitFunction = ({ action }) => {
		const theme = action.searchParams.get('theme')

		if (theme) {
			document.documentElement.setAttribute('data-theme', theme)
		}
	}

	const checkedValue = writable(document.documentElement.getAttribute('data-theme') || 'night')

	const {
		elements: { root, item },
		helpers: { isChecked }
	} = createRadioGroup({
		value: checkedValue
	})

	const options = ['system', 'light', 'night']
</script>

<form
	method="POST"
	use:enhance={submitUpdateTheme}
	use:melt={$root}
	class="flex flex-col gap-3 data-[orientation=horizontal]:flex-row"
	aria-label="Application appearance"
>
	{#each options as option}
		<div class="flex items-center gap-3">
			<button
				use:melt={$item(option)}
				formaction="/?/setTheme&theme={option}"
				type="submit"
				class="grid h-4 w-4 cursor-pointer place-items-center rounded-full bg-neutral shadow-sm transition-colors duration-200 hover:bg-slate-700"
				id={option}
				aria-labelledby="{option}-label"
			>
				{#if $isChecked(option)}
					<div class="h-[10px] w-[10px] rounded-full bg-slate-600" />
				{/if}
			</button>
			<label class="cursor-pointer capitalize" for={option} id="{option}-label">
				{option}
			</label>
		</div>
	{/each}
</form>
