import { TMDB_API_KEY } from '$env/static/private'
import { movieList, tvList } from '$lib/stinkmeanersPicks.js'
import type { MovieDetails, ShowDetails } from '$types'

export const load = async ({ fetch }) => {
	const getPicks = async () => {
		const movies: MovieDetails[] = await Promise.all(
			movieList.map(async (movie) => {
				const res = await fetch(
					`https://api.themoviedb.org/3/movie/${movie}?api_key=${TMDB_API_KEY}&append_to_response=images&include_image_language=en,null`
				)
				const data = await res.json()
				return data
			})
		)

		// const tvShows: ShowDetails[] = await Promise.all(
		// 	tvList.map(async (show) => {
		// 		const res = await fetch(
		// 			`https://api.themoviedb.org/3/tv/${show}?api_key=${TMDB_API_KEY}&append_to_response=images&include_image_language=en,null`
		// 		)
		// 		const data = await res.json()
		// 		return data
		// 	})
		// )

		return { movies }
	}

	return {
		stinkmeanersPicks: getPicks()
	}
}
