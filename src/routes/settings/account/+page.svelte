<script>
	import { Skeleton } from '$components'
	import Label from '../components/Label.svelte'
</script>

<hgroup>
	<h2>Account settings</h2>
	<p>Change details around your account.</p>
</hgroup>

<div class="grid grid-cols-2 gap-x-16">
	<div class="divider col-span-2 mb-8" />

	<hgroup>
		<h3>Name</h3>
		<p>This name will be displayed on your team profiles.</p>
	</hgroup>

	<form class="mr-4 flex items-center">
		<input
			type="text"
			id="name"
			class="h-10 w-full rounded-md border border-slate-700 bg-slate-800/20 px-3 py-2 text-sm placeholder:text-slate-500"
			placeholder="John Doe"
		/>
	</form>

	<div class="divider col-span-2 mb-8" />

	<hgroup>
		<h3>Email</h3>
		<p>This will be used to sign in, provide reports and to notify you of product updates.</p>
	</hgroup>

	<form class="mr-4 flex items-center">
		<input
			type="text"
			id="email"
			class="h-10 w-full rounded-md border border-slate-700 bg-slate-800/20 px-3 py-2 text-sm placeholder:text-slate-500"
			placeholder="john.doe@example.com"
		/>
	</form>
</div>
