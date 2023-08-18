<script lang="ts">
	import Checkbox from './components/Checkbox.svelte'
	import RadioGroup from './components/RadioGroup.svelte'
</script>

<hgroup>
	<h2>General settings</h2>
	<p>Customize your experience.</p>
</hgroup>

<div class="not-prose flex gap-6">
	<h3 class="font-semibold">Appearance:</h3>
	<RadioGroup />
</div>

<div class="divider" />

<div>
	<Checkbox />
</div>
