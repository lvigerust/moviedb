<script lang="ts">
	import { draw } from 'svelte/transition'
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	fill="none"
	viewBox="0 0 24 24"
	stroke-width="1.5"
	stroke="currentColor"
	class="h-5 w-5 stroke-[1.5px]"
>
	<path
		transition:draw={{ duration: 600 }}
		stroke-linecap="round"
		stroke-linejoin="round"
		d="M4.5 12.75l6 6 9-13.5"
	/>
</svg>
