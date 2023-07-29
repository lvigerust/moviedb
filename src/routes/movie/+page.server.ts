import { TMDB_API_KEY } from '$env/static/private'
import type { Genre, Movie } from '$types'

export const load = async ({ fetch }) => {
	const getPopularMovies = async () => {
		const popularMoviesRes = await fetch(
			`https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_API_KEY}`
		)
		const popularMoviesData = await popularMoviesRes.json()
		const popularMovies: Movie[] = popularMoviesData.results
		return popularMovies
	}

	const getMovieGenres = async () => {
		const movieGenresRes = await fetch(
			`https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_API_KEY}`
		)
		const movieGenresData = await movieGenresRes.json()
		return movieGenresData.genres as Genre[]
	}

	return {
		popularMovies: getPopularMovies(),
		genres: getMovieGenres(),
		pageTitle: 'Movies'
	}
}
