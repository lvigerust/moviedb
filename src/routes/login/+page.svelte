<script lang="ts">
	export let data

	$: ({ requestToken } = data)

	$: console.log(requestToken)
</script>

<main class="grid h-full grid-cols-2">
	<div class="grid h-full w-full content-center">
		<div class="text-center sm:mx-auto sm:w-full sm:max-w-sm">
			<hgroup>
				<h2 class="mt-10 text-2xl font-bold leading-9 tracking-tight text-slate-300">
					Sign in to your account
				</h2>
				<p class="mt-2 text-sm leading-6">
					Click the button below to login or signup to The Movie Database.
				</p>
			</hgroup>
		</div>

		<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
			<a
				href={`https://www.themoviedb.org/auth/access?request_token=${requestToken.request_token}`}
				class="flex w-full cursor-pointer justify-center rounded-md bg-teal-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
				>Take me there!</a
			>

			<a href="/" class="mt-10 block text-center text-sm font-semibold leading-6 text-slate-400"
				>Go back</a
			>
		</div>
	</div>

	<div class="z-10 mt-2 grid w-full place-content-center rounded-tl-lg bg-neutral">
		<ul class="steps steps-vertical">
			<li class="step step-success">Press the button</li>
			<li class="step">Login or sign up</li>
			<li class="step">Start exploring!</li>
		</ul>
	</div>
</main>
