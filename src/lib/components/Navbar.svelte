<script lang="ts">
	import { page } from '$app/stores'
	import { Search } from '$components'

	const menuItems: { href: string; label: string }[] = [
		{
			href: '/movie',
			label: 'Movies'
		},
		{
			href: '/tv',
			label: 'TV Shows'
		}
	]
</script>

<nav
	class="navbar px-4 text-sm font-semibold text-slate-400 lg:px-8"
	class:text-neutral-50={$page.error}
>
	<div class="navbar-start">
		<a
			class="font-Display {$page.error ? 'hover:slate-300' : 'hover:text-slate-300'}"
			class:text-slate-300={$page.url.pathname === '/'}
			href="/">Stinkmeaner</a
		>
	</div>

	<ul class="navbar-center gap-x-6">
		{#each menuItems as { href, label }}
			<li>
				<a
					class="{$page.error ? 'hover:slate-300' : 'hover:text-slate-300'} "
					class:text-slate-300={$page.url.pathname.startsWith(href)}
					{href}>{label}</a
				>
			</li>
		{/each}
	</ul>
	<div class="navbar-end">
		<Search />
	</div>
</nav>
