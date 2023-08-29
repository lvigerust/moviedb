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

<div class="flex min-h-screen w-full bg-slate-900 text-sm">
	<aside class="flex w-72 flex-col pl-10 pt-8">
		<a href="/" class="font-Display text-lg font-bold">Filmguide</a>

		<ul class="mt-10 space-y-2 text-slate-500">
			{#each menuItems as { title, href }, index}
				<li>
					<a
						{href}
						class="block w-full py-2 pr-4 font-semibold transition-colors hover:text-slate-300"
						class:line-through={index === 1 || index === 2}>{title}</a
					>
				</li>
			{/each}
		</ul>
	</aside>
	<section
		in:fly={{ y: '25%', delay: 750, duration: 550 }}
		class="transition-layer prose mt-2 w-full max-w-none rounded-tl-xl bg-slate-800/25 px-20 pt-10 shadow-2xl shadow-slate-950/50 prose-h2:mt-0 prose-h3:mt-0 prose-p:text-sm [&>*:first-child]:mb-12"
	>
		{#key url}
			<div in:fade={{ delay: 150, duration: 150 }} out:fade={{ duration: 150 }}>
				<slot />
			</div>
		{/key}
	</section>
</div>
