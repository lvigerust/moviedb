<script lang="ts">
	export let data

	const { person } = data
</script>

<div class="w-full text-center">
	<div class="flex items-center justify-center gap-4">
		<div class="avatar">
			<div class="w-28 rounded-full">
				<img src={`https://images.tmdb.org/t/p/w185/${person.profile_path}`} alt={person.name} />
			</div>
		</div>
		<h1 class="text-2xl font-semibold tracking-tight">{person.name}</h1>
	</div>
	<div class="mx-auto mt-8 max-w-5xl">
		<p class="tracking-tight">{person.biography}</p>
	</div>
</div>
