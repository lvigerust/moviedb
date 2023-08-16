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
	<div class="flex items-center justify-center">
		<button
			use:melt={$root}
			class="flex h-6 w-6 appearance-none items-center justify-center
              rounded-md bg-slate-200 text-slate-700 shadow-lg hover:opacity-90"
			id="checkbox"
		>
			{#if $isChecked}
				<Check />
			{/if}
			<input use:melt={$input} />
		</button>
		<label class="cursor-pointer pl-[15px] text-[15px] leading-none" for="checkbox"
			>Show Tip of the day</label
		>
	</div>
</form>
