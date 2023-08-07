<script lang="ts">
	import { enhance } from '$app/forms'
	import { page } from '$app/stores'
	import { createRadioGroup, melt } from '@melt-ui/svelte'
	import type { SubmitFunction } from '@sveltejs/kit'

	const submitUpdateTheme: SubmitFunction = ({ action }) => {
		const theme = action.searchParams.get('theme')

		if (theme) {
			document.documentElement.setAttribute('data-theme', theme)
		}
	}

	const {
		elements: { root, item },
		helpers: { isChecked }
	} = createRadioGroup({
		defaultValue: 'dark'
	})

	const optionsArr = [
		{ value: 'system', theme: 'auto' },
		{ value: 'light', theme: 'light' },
		{ value: 'dark', theme: 'night' }
	]
</script>

<form
	method="POST"
	use:enhance={submitUpdateTheme}
	use:melt={$root}
	class="flex flex-col gap-3 data-[orientation=horizontal]:flex-row"
	aria-label="View density"
>
	{#each optionsArr as { theme, value }}
		<div class="flex items-center gap-3">
			<button
				use:melt={$item(value)}
				formaction="/?/setTheme&theme={theme}&redirectTo={$page.url.pathname}"
				type="submit"
				class="grid h-4 w-4 cursor-pointer place-items-center rounded-full bg-neutral shadow-sm transition-colors duration-200 hover:bg-slate-700"
				id={value}
				aria-labelledby="{value}-label"
			>
				{#if $isChecked(value)}
					<div class="h-[10px] w-[10px] rounded-full bg-slate-600" />
				{/if}
			</button>
			<label class="cursor-pointer capitalize" for={value} id="{value}-label">
				{value}
			</label>
		</div>
	{/each}
</form>

<!-- Form action to set theme
formaction="/?/setTheme&theme={option}&redirectTo={$page.url.pathname}" -->

<!-- use:melt={$item(value)} -->
