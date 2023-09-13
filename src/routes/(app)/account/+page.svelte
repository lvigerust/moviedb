<script lang="ts">
	import { enhance } from '$app/forms'

	export let data

	const { user } = data
</script>

<div class="flex w-full flex-col items-center gap-12 pt-20">
	{#if user && user.avatar.tmdb.avatar_path}
		<div class="avatar">
			<div class="w-36 rounded-full">
				<img
					src={`https://image.tmdb.org/t/p/original/${user?.avatar.tmdb.avatar_path}`}
					alt={`Avatar for ${user.username}`}
				/>
			</div>
		</div>
	{/if}

	<h1
		class="mx-auto max-w-4xl text-center font-Display text-4xl font-medium tracking-tight text-slate-200"
	>
		Welcome, {user?.name === '' ? user.username : user?.name}!
	</h1>
	<a href="/account/watchlist" class="btn btn-primary btn-wide">Watchlist movies</a>

	<form class="w-fit" action="/account?/logout" method="POST" use:enhance>
		<button class="btn btn-warning">Logout</button>
	</form>
</div>
