<script lang="ts">
	import { StatIcon } from '$icons'
	import type { MovieDetails } from '$types'
	import { formatNumber, calculatePercentage, formatDate } from '$utils'
	import { inView } from 'motion'
	import { onMount } from 'svelte'
	import { tweened } from 'svelte/motion'

	export let movieDetails: MovieDetails

	const budget = tweened(0, {
		duration: 800,
		delay: 200
	})

	const revenue = tweened(0, {
		duration: 800,
		delay: 200
	})

	onMount(() => {
		// Tween stat numbers
		inView('#stats', () => {
			budget.set(movieDetails.budget)
			revenue.set(movieDetails.revenue)
		})
	})
</script>

<section id="stats">
	<div class="stats w-full justify-center">
		{#if movieDetails.budget}
			<div class="stat">
				<div class="stat-figure text-primary">
					<StatIcon />
				</div>
				<div class="stat-title">Budget</div>
				<div class="stat-value text-primary">{formatNumber($budget)}</div>
			</div>
		{/if}

		{#if movieDetails.revenue}
			<div class="stat">
				<div class="stat-figure text-secondary">
					<StatIcon icon="banknotes" />
				</div>
				<div class="stat-title">Revenue</div>
				<div class="stat-value text-secondary">{formatNumber($revenue)}</div>
				<div class="stat-desc">
					{calculatePercentage(movieDetails.revenue, movieDetails.budget).toFixed(0)}% {movieDetails.revenue >
					movieDetails.budget
						? 'increase'
						: 'decrease'} from budget
				</div>
			</div>
		{/if}

		<div class="stat">
			<div class="stat-figure text-accent">
				<StatIcon icon="date" />
			</div>
			<div class="stat-title">Status</div>
			<div class="stat-value text-accent">{movieDetails.status}</div>
			<div class="stat-desc">{formatDate(movieDetails.release_date)}</div>
		</div>
	</div>
</section>
