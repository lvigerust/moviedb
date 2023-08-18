<script lang="ts">
	import { enhance } from '$app/forms'
	import type { SubmitFunction } from './$types'
	import Checkbox from './components/Checkbox.svelte'
	import RadioGroup from './components/RadioGroup.svelte'

	const submitUpdateTheme: SubmitFunction = ({ action }) => {
		const theme = action.searchParams.get('theme')

		if (theme) {
			document.documentElement.setAttribute('data-theme', theme)
		}
	}
</script>

<hgroup>
	<h2>General settings</h2>
	<p>Customize how the app looks and behaves.</p>
</hgroup>

<!-- <div class="not-prose flex gap-6">
	<h3 class="font-semibold">Appearance:</h3>
	<RadioGroup />
</div> -->

<form method="POST" use:enhance={submitUpdateTheme} class="grid h-[270px] grid-cols-3 gap-x-6">
	<button
		formaction="/settings?/setTheme&theme=auto"
		type="submit"
		class="flex h-full w-full flex-col items-end overflow-hidden rounded-lg border border-blue-700"
	>
		<div class="h-full w-full bg-slate-800/40 px-12 py-6">
			<div class="flex h-full w-full gap-x-4 rounded-md bg-slate-900 p-4">
				<div class="flex h-full w-1/3 flex-col justify-between">
					<div class="space-y-[10px]">
						<div class="h-4 w-full rounded bg-blue-700" />
						<div class="h-4 w-full rounded bg-slate-800" />
						<div class="h-4 w-full rounded bg-slate-800" />
						<div class="h-4 w-full rounded bg-slate-800" />
					</div>
					<div class="h-4 w-full rounded bg-slate-800" />
				</div>

				<div class="flex h-full w-full flex-col space-y-[10px]">
					<div class="flex justify-between">
						<div class="h-4 w-[45%] rounded bg-slate-800" />
						<div class="flex h-4 w-1/4 gap-x-[6px]">
							<div class="h-full w-full rounded bg-slate-800" />
							<div class="h-full w-full rounded bg-blue-700" />
						</div>
					</div>

					<div class="h-full w-full rounded-xl bg-slate-800 p-1">
						<div class="h-full w-full rounded-lg bg-slate-900/80" />
					</div>
				</div>
			</div>
		</div>

		<div class="w-full bg-slate-900">
			<p class="my-0 px-10 py-5 text-start font-semibold text-slate-300">System settings</p>
		</div>
	</button>
	<button
		formaction="/settings?/setTheme&theme=light"
		type="submit"
		class="flex h-full w-full flex-col items-end overflow-hidden rounded-lg border border-slate-700/50"
	>
		<div class="h-full w-full bg-slate-800/40 px-12 py-6">
			<div class="flex h-full w-full gap-x-4 rounded-md bg-slate-300 p-4">
				<div class="flex h-full w-1/3 flex-col justify-between">
					<div class="space-y-[10px]">
						<div class="h-4 w-full rounded bg-blue-700" />
						<div class="h-4 w-full rounded bg-slate-400" />
						<div class="h-4 w-full rounded bg-slate-400" />
						<div class="h-4 w-full rounded bg-slate-400" />
					</div>
					<div class="h-4 w-full rounded bg-slate-400" />
				</div>

				<div class="flex h-full w-full flex-col space-y-[10px]">
					<div class="flex justify-between">
						<div class="h-4 w-[45%] rounded bg-slate-400" />
						<div class="flex h-4 w-1/4 gap-x-[6px]">
							<div class="h-full w-full rounded bg-slate-400" />
							<div class="h-full w-full rounded bg-blue-700" />
						</div>
					</div>

					<div class="h-full w-full rounded-xl bg-slate-400 p-1">
						<div class="h-full w-full rounded-lg bg-slate-300/90" />
					</div>
				</div>
			</div>
		</div>

		<div class="w-full bg-slate-900">
			<p class="my-0 px-10 py-5 text-start font-semibold text-slate-300">Light theme</p>
		</div>
	</button>

	<button
		formaction="/settings?/setTheme&theme=night"
		type="submit"
		class="flex h-full w-full flex-col items-end overflow-hidden rounded-lg border border-slate-700/50"
	>
		<div class="h-full w-full bg-slate-800/40 px-12 py-6">
			<div class="flex h-full w-full gap-x-4 rounded-md bg-slate-900 p-4">
				<div class="flex h-full w-1/3 flex-col justify-between">
					<div class="space-y-[10px]">
						<div class="h-4 w-full rounded bg-blue-700" />
						<div class="h-4 w-full rounded bg-slate-800" />
						<div class="h-4 w-full rounded bg-slate-800" />
						<div class="h-4 w-full rounded bg-slate-800" />
					</div>
					<div class="h-4 w-full rounded bg-slate-800" />
				</div>

				<div class="flex h-full w-full flex-col space-y-[10px]">
					<div class="flex justify-between">
						<div class="h-4 w-[45%] rounded bg-slate-800" />
						<div class="flex h-4 w-1/4 gap-x-[6px]">
							<div class="h-full w-full rounded bg-slate-800" />
							<div class="h-full w-full rounded bg-blue-700" />
						</div>
					</div>

					<div class="h-full w-full rounded-xl bg-slate-800 p-1">
						<div class="h-full w-full rounded-lg bg-slate-900/80" />
					</div>
				</div>
			</div>
		</div>

		<div class="w-full bg-slate-900">
			<p class="my-0 px-10 py-5 text-start font-semibold text-slate-300">Dark theme</p>
		</div>
	</button>
</form>

<div class="divider my-12" />

<div>
	<Checkbox />
</div>
