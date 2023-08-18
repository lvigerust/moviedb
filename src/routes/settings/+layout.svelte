<script lang="ts">
	import { fade } from 'svelte/transition'

	export let data

	$: ({ url } = data)

	const menuItems: { title: string; href: string }[] = [
		{ title: 'General', href: '/settings' },
		{ title: 'Account', href: '/settings/account' },
		{ title: 'Password', href: '/settings/password' }
	]
</script>

<div class="flex w-full gap-20 text-sm">
	<aside class="flex flex-col gap-8">
		<a href="/" class="text-lg font-bold">Filmguide</a>
		<ul>
			{#each menuItems as { title, href }}
				<li>
					<a {href}>{title}</a>
				</li>
			{/each}
		</ul>
	</aside>
	{#key url}
		<section
			in:fade={{ delay: 150, duration: 150 }}
			out:fade={{ duration: 150 }}
			class="transition-layer prose h-[calc(100vh-140px)] w-full max-w-none bg-slate-950/20 prose-h2:mt-0 [&>*:first-child]:mb-12"
		>
			<slot />
		</section>
	{/key}
</div>
