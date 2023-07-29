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

	let previousY: number
	let currentY: number
	let clientHeight: number

	const deriveDirection = (y: number) => {
		const direction = !previousY || previousY < y ? 'down' : 'up'
		previousY = y

		return direction
	}

	$: scrollDirection = deriveDirection(currentY)
	$: offscreen = scrollDirection === 'down' && currentY > clientHeight * 4
</script>

<svelte:window bind:scrollY={currentY} />

<div
	class="sticky top-0 z-50 bg-base-100/50 backdrop-blur transition-transform ease-in"
	class:-translate-y-full={offscreen}
	bind:clientHeight
>
	<nav
		class="navbar mx-auto max-w-8xl px-4 text-sm font-semibold text-slate-400"
		class:text-white={$page.error}
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
</div>
