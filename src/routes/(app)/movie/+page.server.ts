import { TMDB_API_KEY } from '$env/static/private'
import { MediaType, type ApiResponse, type Movie } from '$types'
import { dynamicSort } from '$utils'

export const load = async ({ fetch }) => {
	const getTrendingMovies = async () => {
		const trendingMoviesRes = await fetch(
			`https://api.themoviedb.org/3/trending/movie/day?api_key=${TMDB_API_KEY}`
		)

		if (trendingMoviesRes.ok) {
			const trendingsMoviesData: ApiResponse<Movie> = await trendingMoviesRes.json()
			trendingsMoviesData.results.map((movie) => {
				movie.media_type = MediaType.Movie
			})

			const sortedByPopularity = trendingsMoviesData.results.sort(dynamicSort('-popularity'))
			return sortedByPopularity
		} else throw new Error("Couldn't get trending movies, please try again later.")
	}

	const getPopularMovies = async () => {
		const popularMoviesRes = await fetch(
			`https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}`
		)

		if (popularMoviesRes.ok) {
			const popularMoviesData: ApiResponse<Movie> = await popularMoviesRes.json()
			popularMoviesData.results.map((movie) => {
				movie.media_type = MediaType.Movie
			})
			return popularMoviesData
		} else throw new Error("Couldn't get popular movies, please try again later.")
	}

	return {
		trendingMovies: getTrendingMovies(),
		popularMovies: getPopularMovies(),
		pageTitle: 'Movies'
	}
}
