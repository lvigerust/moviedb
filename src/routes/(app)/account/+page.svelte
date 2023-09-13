<script lang="ts">
	import { enhance } from '$app/forms'

	export let data

	const { user } = data
</script>

<div class="flex w-full flex-col items-center gap-12">
	<h1
		class="mx-auto mt-20 max-w-4xl text-center font-Display text-5xl font-medium tracking-tight text-slate-200 sm:text-7xl"
	>
		Welcome {user?.name === '' ? user.username : user?.name}
	</h1>
	<a href="/account/watchlist" class="btn btn-primary btn-wide">Watchlist movies</a>

	<form class="w-fit" action="/account?/logout" method="POST" use:enhance>
		<button class="btn btn-warning">Logout</button>
	</form>
</div>
