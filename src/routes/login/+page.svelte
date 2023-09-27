<script lang="ts">
	import { page } from '$app/stores'

	export let data
	$: ({ requestToken } = data)
</script>

<div
	class="mx-auto mb-4 mt-44 flex w-full max-w-md rounded-2xl bg-slate-600/10 p-8 ring-1 ring-white/10 backdrop-blur-lg"
>
	<div class="mx-auto max-w-sm text-center">
		<h1 class="font-Display text-2xl font-medium">Sign in to your account</h1>
		<p class="mt-2 text-sm text-slate-400">Welcome back! Please login or sign up.</p>
		<a
			href={`https://www.themoviedb.org/authenticate/${requestToken.request_token}?redirect_to=${$page.url.origin}/user
				`}
			class="mt-8 flex w-full cursor-pointer justify-center rounded-full bg-blue-700 px-3 py-1.5 text-xs font-semibold leading-6 text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
			>Sign in with The Movie Database</a
		>
	</div>
</div>
