import { TMDB_ACCESS_TOKEN } from '$env/static/private'
import type { ApiResponse, Movie } from '$types'

export const load = async ({ fetch, cookies }) => {
	const getWatchlistMovies = async () => {
		const url = `https://api.themoviedb.org/3/account/8629851/watchlist/movies?language=en-US&page=1&session_id=${cookies.get(
			'session'
		)}&sort_by=created_at.asc`

		const options = {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`
			}
		}
		const watchlistMoviesRes = await fetch(url, options)

		if (watchlistMoviesRes.ok) {
			const watchlistMoviesData: ApiResponse<Movie> = await watchlistMoviesRes.json()
			return watchlistMoviesData
		} else console.error("Couldn't get watchlist movies.")
	}

	return {
		watchlistMovies: getWatchlistMovies()
	}
}
