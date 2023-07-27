import { TMDB_API_KEY } from '$env/static/private'
import type { Movie } from '$types'

export const load = async ({ fetch }) => {
	const getPopularMovies = async () => {
		const popularMoviesRes = await fetch(
			`https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_API_KEY}`
		)
		const popularMoviesData = await popularMoviesRes.json()
		const popularMovies: Movie[] = popularMoviesData.results
		return popularMovies
	}

	return {
		popularMovies: getPopularMovies(),
		pageTitle: 'Movies'
	}
}
