<script lang="ts">
	export let title = ''
	export let id: string | undefined = undefined

	$: if (title !== '') {
		id = title.replace(' ', '').toLowerCase()
	}
</script>

<section {id} class="mb-6">
	<div class="divider" />
	<h2 id={`${id}-title`} class="mb-6 text-2xl font-semibold tracking-tight text-slate-300">
		{title}
	</h2>

	<slot>"Section content"</slot>
</section>
