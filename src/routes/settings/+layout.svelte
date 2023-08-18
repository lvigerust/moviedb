<script lang="ts">
	import { fade, fly } from 'svelte/transition'

	export let data

	$: ({ url } = data)

	const menuItems: { title: string; href: string }[] = [
		{ title: 'General', href: '/settings' },
		{ title: 'Account', href: '/settings/account' },
		{ title: 'Password', href: '/settings/password' }
	]
</script>

<div
	in:fly={{ x: 500, duration: 300 }}
	class="absolute inset-0 flex h-screen w-full overflow-hidden bg-slate-950/50 text-sm"
>
	<aside class="flex w-72 flex-col px-8 pt-8">
		<a href="/" class="font-Display text-lg font-bold">Filmguide</a>

		<ul class="mt-10 space-y-2 text-slate-500">
			{#each menuItems as { title, href }}
				<li>
					<a
						{href}
						class="block w-full py-2 pr-4 font-semibold transition-colors hover:text-slate-300"
						>{title}</a
					>
				</li>
			{/each}
		</ul>
	</aside>
	<section
		in:fly={{ y: 100, delay: 1000, duration: 800 }}
		class="transition-layer prose mt-2 w-full max-w-none rounded-tl-xl bg-slate-900 px-20 pt-10 prose-h2:mt-0 prose-h3:mt-0 prose-p:text-sm [&>*:first-child]:mb-12"
	>
		<slot />
	</section>
</div>
