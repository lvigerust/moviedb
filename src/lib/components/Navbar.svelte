<script lang="ts">
	import { page } from '$app/stores'
	import { Search } from '$icons'

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

<nav class="navbar px-4 text-sm font-semibold text-slate-400 lg:px-8">
	<div class="navbar-start">
		<a
			class="font-Display hover:text-slate-300"
			class:text-slate-300={$page.url.pathname === '/'}
			href="/">Stinkmeaner</a
		>
	</div>

	<ul class="navbar-center gap-x-6">
		{#each menuItems as { href, label }}
			<li>
				<a class="hover:text-slate-300" class:text-slate-300={$page.url.pathname === href} {href}
					>{label}</a
				>
			</li>
		{/each}
	</ul>
	<div class="navbar-end">
		<button class="btn btn-circle btn-ghost btn-sm p-1"> <Search /> </button>
	</div>
</nav>
