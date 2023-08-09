import { TMDB_API_KEY } from '$env/static/private'
import type { ApiResponse, Movie } from '$types'

export const load = async ({ fetch }) => {
	const getPopularMovies = async () => {
		const popularMoviesRes = await fetch(
			`https://api.themoviedb.org/3/trending/movie/day?api_key=${TMDB_API_KEY}`
		)

		if (popularMoviesRes.ok) {
			const popularMoviesData: ApiResponse<Movie> = await popularMoviesRes.json()
			return popularMoviesData
		} else throw new Error("Couldn't get popular movies, please try again later.")
	}

	return {
		popularMovies: getPopularMovies(),
		pageTitle: 'Movies',
		streamed: {}
	}
}
