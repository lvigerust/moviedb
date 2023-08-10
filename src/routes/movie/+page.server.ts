import { TMDB_API_KEY } from '$env/static/private'
import type { ApiResponse, Movie, MovieDetails } from '$types'

export const load = async ({ fetch }) => {
	const getTrendingMovies = async () => {
		const trendingMoviesRes = await fetch(
			`https://api.themoviedb.org/3/trending/movie/day?api_key=${TMDB_API_KEY}`
		)

		if (trendingMoviesRes.ok) {
			const trendingsMoviesData: ApiResponse<Movie> = await trendingMoviesRes.json()
			return trendingsMoviesData
		} else throw new Error("Couldn't get trending movies, please try again later.")
	}

	const getPopularMovies = async () => {
		const popularMoviesRes = await fetch(
			`https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}`
		)

		if (popularMoviesRes.ok) {
			const popularMoviesData: ApiResponse<Movie> = await popularMoviesRes.json()
			return popularMoviesData
		} else throw new Error("Couldn't get popular movies, please try again later.")
	}

	const getTrendingMoviesDetails = async () => {
		const trendingMovies = (await getPopularMovies()).results

		const trendingMoviesDetails: MovieDetails[] = []

		for (const movie of trendingMovies) {
			const movieDetailsRes = await fetch(
				`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${TMDB_API_KEY}&append_to_response=images`
			)

			if (movieDetailsRes.ok) {
				trendingMoviesDetails.push(await movieDetailsRes.json())
			} else throw new Error(`Couldn't get details for ${movie.title}, please try again later.`)
		}
		return trendingMoviesDetails
	}

	return {
		trendingMovies: getTrendingMovies(),
		popularMovies: getPopularMovies(),
		pageTitle: 'Movies',
		streamed: {
			trendingMoviesDetails: getTrendingMoviesDetails()
		}
	}
}
