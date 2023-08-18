<script lang="ts">
	import Checkbox from './components/Checkbox.svelte'
	import RadioGroup from './components/RadioGroup.svelte'
</script>

<section>
	<hgroup>
		<h2>General settings</h2>
		<p>Customize your user experience.</p>
	</hgroup>

	<div>
		<Checkbox />
	</div>

	<div class="divider" />

	<div class="not-prose flex gap-6">
		<p>Appearance:</p>
		<RadioGroup />
	</div>
</section>
