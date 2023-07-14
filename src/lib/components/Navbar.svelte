<script lang="ts">
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

<nav class="navbar px-4 text-sm font-semibold lg:px-8">
	<div class="navbar-start">
		<a href="/">Stinkmeaner</a>
	</div>

	<ul class="navbar-center gap-x-6">
		{#each menuItems as { href, label }}
			<li><a {href}>{label}</a></li>
		{/each}
	</ul>
	<div class="navbar-end">
		<button class="btn btn-circle btn-ghost btn-sm p-1"> <Search /> </button>
	</div>
</nav>
