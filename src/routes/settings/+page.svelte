<script lang="ts">
	import { enhance } from '$app/forms'
	import { afterNavigate } from '$app/navigation'
	import type { SubmitFunction } from './$types'
	import Checkbox from './components/Checkbox.svelte'

	const submitUpdateTheme: SubmitFunction = ({ action }) => {
		const theme = action.searchParams.get('theme')

		if (theme) {
			document.documentElement.setAttribute('data-theme', theme)
			activeTheme = theme
		}
	}

	let activeTheme: string | null

	afterNavigate(() => {
		activeTheme = document.documentElement.getAttribute('data-theme')
	})
</script>

<hgroup>
	<h2>Interface settings</h2>
	<p>Customize your application theme.</p>
</hgroup>

<!-- <div class="not-prose flex gap-6">
	<h3 class="font-semibold">Appearance:</h3>
	<RadioGroup />
</div> -->

<form method="POST" use:enhance={submitUpdateTheme} class="grid grid-cols-3 gap-x-6">
	<button
		formaction="/settings?/setTheme&theme=auto"
		type="submit"
		class="flex h-full w-full flex-col items-end overflow-hidden rounded-lg border transition-colors {activeTheme ===
		'auto'
			? ' border-2 border-indigo-700/75'
			: 'border-slate-700/50'} bg-slate-800/40"
	>
		<div class="h-full w-full object-contain px-12">
			<img src="/themes/auto.png" alt="" />
		</div>

		<div class="w-full bg-slate-900">
			<p class="my-0 px-10 py-5 text-start font-semibold text-slate-300">System</p>
		</div>
	</button>
	<button
		formaction="/settings?/setTheme&theme=light"
		type="submit"
		class="flex h-full w-full flex-col items-end overflow-hidden rounded-lg border transition-colors {activeTheme ===
		'light'
			? ' border-2 border-indigo-700/75'
			: 'border-slate-700/50'} bg-slate-800/40"
	>
		<div class="h-full w-full object-contain px-12">
			<img src="/themes/light.png" alt="" />
		</div>

		<div class="w-full bg-slate-900">
			<p class="my-0 px-10 py-5 text-start font-semibold text-slate-300">Light</p>
		</div>
	</button>
	<button
		formaction="/settings?/setTheme&theme=night"
		type="submit"
		class="flex h-full w-full flex-col items-end overflow-hidden rounded-lg border transition-colors {activeTheme ===
		'night'
			? ' border-2 border-indigo-700/75'
			: 'border-slate-700/50'} bg-slate-800/40"
	>
		<div class="h-full w-full object-contain px-12">
			<img src="/themes/dark.png" alt="" />
		</div>

		<div class="w-full bg-slate-900">
			<p class="my-0 px-10 py-5 text-start font-semibold text-slate-300">Dark</p>
		</div>
	</button>
</form>

<div class="divider my-12" />

<div>
	<Checkbox option="Show Tip of the day" />
</div>
<div>
	<p>Radio button</p>
	<Checkbox option="Rotten Tomatoes or IMDb Rating" />
</div>
