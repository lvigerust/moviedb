<script lang="ts">
	import { Back } from '$icons'
	import { fade } from 'svelte/transition'

	export let data

	$: ({ url } = data)

	const menuItems: { title: string; href: string }[] = [
		{ title: 'General', href: '/settings' },
		{ title: 'Appearance', href: '/settings/appearance' },
		{ title: 'Account', href: '/settings/account' },
		{ title: 'Password', href: '/settings/password' }
	]
</script>

<header class="prose mt-4">
	<!-- <a href="/" class="btn btn-circle btn-ghost">
		<Back />
	</a> -->

	<hgroup class="mt-20">
		<h1>Settings</h1>
		<p>Manage your account settings and preferences.</p>
	</hgroup>
</header>

<div class="divider" />

<div class="mt-8 flex gap-20">
	<aside>
	<ul class="w-72">
		{#each menuItems as { title, href }}
			<li
				class="w-full rounded-md px-4 py-3 transition-all {url === href
					? 'bg-slate-800 font-semibold text-slate-300/90'
					: ''} "
			>
				<a class="w-full" {href}>{title}</a>
			</li>
		{/each}
	</ul>
	</aside>
	{#key url}
		<div
			in:fade={{ delay: 150, duration: 150 }}
			out:fade={{ duration: 150 }}
			class="transition-layer prose min-h-[30vh] prose-h2:mt-0"
		>
			<slot />
		</div>
	{/key}
</div>
