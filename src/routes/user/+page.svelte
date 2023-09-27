<script lang="ts">
	import { enhance } from '$app/forms'
	import { Check } from '$icons'
	import Bookmark from '$icons/Bookmark.svelte'

	export let data

	const {
		user
		// streamed: { watchlistMovies, watchlistShows, lists }
	} = data
</script>

<div class="space-y-6 py-1">
	<section class="w-full rounded-xl bg-slate-600/10 p-12 ring-1 ring-white/10">
		<h2 class="font-Display text-2xl font-medium tracking-tight text-slate-300">Profile Details</h2>
		<div class="mb-12 mt-8 flex gap-12">
			<div class="avatar">
				<div class="w-28 rounded-full">
					<img
						src={`https://image.tmdb.org/t/p/original/${user?.avatar.tmdb.avatar_path}`}
						alt={`Avatar for ${user?.username}`}
					/>
				</div>
			</div>

			<div class="w-full max-w-xl">
				<h3 class="font-Display text-xl font-medium tracking-tight text-slate-200">
					{user?.name ?? user?.username}
				</h3>
				<div class="mt-8 flex w-full justify-between gap-8">
					<hgroup>
						<p class="text-sm">Username</p>
						<h4 class="font-semibold">{user?.username}</h4>
					</hgroup>
					<hgroup>
						<p class="text-sm">Default Language</p>
						<h4 class="font-semibold">{user?.iso_639_1 === 'en' ? 'English' : user?.iso_639_1}</h4>
					</hgroup>
					<hgroup>
						<p class="text-sm">Country</p>
						<h4 class="font-semibold">{user?.iso_3166_1 === 'NO' ? 'Norway' : user?.iso_3166_1}</h4>
					</hgroup>
				</div>
			</div>
		</div>

		<!-- <div class="flex gap-4">
			<a
				href="/user/watchlist"
				class="flex h-24 w-full items-center gap-4 rounded-2xl bg-slate-700 px-6 py-4 shadow"
			>
				<button class="btn btn-circle btn-ghost">
					<Check />
				</button>

				{#await watchlistMovies then watchlistMovies2}
					<div>
						<p class="text-lg font-bold">{watchlistMovies2.total_results}</p>
						<p class="text-sm">
							{watchlistMovies2.total_results > 1 ? 'Movies' : 'Movie'} in watchlist
						</p>
					</div>
				{/await}
			</a>
			<a
				href="/user/watchlist"
				class="flex h-24 w-full items-center gap-4 rounded-2xl bg-slate-700 px-6 py-4 shadow"
			>
				<button class="btn btn-circle btn-ghost">
					<Check />
				</button>

				{#await watchlistShows then watchlistShows2}
					<div>
						<p class="text-lg font-bold">{watchlistShows2.total_results}</p>
						<p class="text-sm">
							{watchlistShows2.total_results > 1 ? 'Shows' : 'Show'} in watchlist
						</p>
					</div>
				{/await}
			</a>
			<div class="flex h-24 w-full items-center gap-4 rounded-2xl bg-slate-700 px-6 py-4 shadow">
				<button class="btn btn-circle btn-ghost">
					<Check />
				</button>
				{#await lists then lists2}
					<div>
						<p class="text-lg font-bold">{lists2.total_results}</p>
						<p class="text-sm">
							Custom {lists2.total_results > 1 ? 'Lists' : 'List'}
						</p>
					</div>
				{/await}
			</div>
		</div> -->
	</section>

	<section class="w-full rounded-xl bg-slate-600/10 p-12 ring-1 ring-white/10">
		<h2 class="font-Display text-2xl font-medium tracking-tight text-slate-300">Settings</h2>

		<form action="/user?/logout" method="POST" use:enhance>
			<button class="btn btn-primary rounded-box btn-wide mt-10">Logout</button>
		</form>
	</section>
</div>
