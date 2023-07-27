import { TMDB_API_KEY } from '$env/static/private'
import { movieList } from '$lib/stinkmeanersPicks.js'
import type { MovieDetails } from '$types'

export const load = async ({ fetch }) => {
	const getPicks = async () => {
		const stinkmeanersPicks = await Promise.all(
			movieList.map(async (movie) => {
				const res = await fetch(
					`https://api.themoviedb.org/3/movie/${movie}?api_key=${TMDB_API_KEY}&language=en-US`
				)
				const data = await res.json()
				return data
			})
		)
		return stinkmeanersPicks as MovieDetails[]
	}

	return {
		stinkmeanersPicks: getPicks(),
		pageTitle: "Meaner's Picks"
	}
}
