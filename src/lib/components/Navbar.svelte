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

<nav class="navbar font-semibold text-sm px-4 lg:px-8">
	<a href="/" class="navbar-start">Stinkmeaner</a>

	<ul class="navbar-center gap-x-6">
		{#each menuItems as { href, label }}
			<li><a {href}>{label}</a></li>
		{/each}
	</ul>
	<div class="navbar-end">
		<button class="btn btn-ghost btn-circle btn-sm"> <Search /> </button>
	</div>
</nav>
