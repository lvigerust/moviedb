import { TMDB_ACCESS_TOKEN, TMDB_API_KEY, TMDB_BASE_URL } from '$env/static/private'
import { movies } from '$lib/watchlist.js'
import type { ApiResponse, Movie, MovieDetails } from '$types'
import { error } from '@sveltejs/kit'

export const load = async ({ fetch }) => {
	const getWatchlist = async () => {
		const watchlist: MovieDetails[] = await Promise.all(
			movies.map(async (movie) => {
				const res = await fetch(
					`https://api.themoviedb.org/3/movie/${movie}?api_key=${TMDB_API_KEY}&append_to_response=images&include_image_language=en,null`
				)
				const data = await res.json()
				data.media_type = 'movie'
				return data
			})
		)

		return { watchlist }
	}

	const getUpcomingMovies = async () => {
		const url = `${TMDB_BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_year=2023&primary_release_date.gte=2023-08-28&primary_release_date.lte=2023-10-01&release_date.gte=2023-08-28&release_date.lte=2023-10-01&sort_by=popularity.desc&year=2023`
		const options = {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`
			}
		}

		const upcomingMoviesRes = await fetch(url, options)

		if (upcomingMoviesRes.ok) {
			const upcomingMoviesData: ApiResponse<Movie> = await upcomingMoviesRes.json()

			return upcomingMoviesData
		} else throw error(404, "Couldn't get upcming movies, please try again.")
	}

	return {
		watchlist: getWatchlist(),
		streamed: {
			upcomingMovies: getUpcomingMovies()
		}
	}
}
