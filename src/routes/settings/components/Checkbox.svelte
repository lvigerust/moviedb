<script lang="ts">
	import { Check } from '$icons'
	import { createCheckbox, melt } from '@melt-ui/svelte'

	const {
		elements: { root, input },
		helpers: { isChecked },
		states: { checked }
	} = createCheckbox({})

	checked.set(true)
</script>

<form>
	<div class="flex items-center gap-6">
		<button
			use:melt={$root}
			class="flex h-6 w-6 appearance-none items-center justify-center rounded-md bg-slate-300 text-slate-700 shadow-lg hover:opacity-90"
			id="checkbox"
		>
			{#if $isChecked}
				<Check />
			{/if}
			<input use:melt={$input} />
		</button>
		<label class="cursor-pointer leading-none" for="checkbox">Show Tip of the day</label>
	</div>
</form>
