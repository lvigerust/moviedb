<script lang="ts">
	export let data

	const { account } = data
</script>

<div class="flex w-full flex-col items-center gap-12">
	<h1
		class="mx-auto mt-20 max-w-4xl text-center font-Display text-5xl font-medium tracking-tight text-slate-200 sm:text-7xl"
	>
		Welcome {account?.name === '' ? account.username : account?.name}
	</h1>

	<form class="w-fit" action="/account?/logout" method="POST">
		<button class="btn btn-warning btn-wide">Logout</button>
	</form>

	<a href="/account/watchlist" class="btn btn-primary normal-case">Watchlist movies</a>
</div>
