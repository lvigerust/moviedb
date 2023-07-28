<script>
	import { page } from '$app/stores'
</script>

<svelte:head>
	<title>{$page.error?.message} — Stinkmeaner Database</title>
</svelte:head>

<div
	class="absolute inset-0 -z-30 grid h-full w-full place-content-center bg-[url('/404.jpg')] bg-cover bg-left-top bg-no-repeat"
>
	<div
		class="absolute inset-0 z-10 grid h-full w-full place-content-center text-center font-sans text-neutral-50 backdrop-blur"
	>
		<h1 class=" text-9xl tracking-tight">{$page.status}</h1>
		<h2 class="text-lg tracking-tighter">{$page.error?.message}</h2>
	</div>
</div>
