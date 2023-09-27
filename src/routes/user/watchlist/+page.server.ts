import { TMDB_ACCESS_TOKEN } from '$env/static/private'
import type { ApiResponse, Movie } from '$types'
import { error } from '@sveltejs/kit'

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
		} else throw error(404, "Couldn't get watchlist movies.")
	}

	return {
		watchlistMovies: getWatchlistMovies(),
		meta: { title: 'My watchlist' }
	}
}

export const actions = {
	removeFromWatchlist: async ({ request, fetch, cookies, locals }) => {
		const formData = await request.formData()

		const id = formData.get('id')

		const url = `https://api.themoviedb.org/3/account/${
			locals.user?.id
		}/watchlist?session_id=${cookies.get('session')}`

		const options = {
			method: 'POST',
			headers: {
				accept: 'application/json',
				'content-type': 'application/json',
				Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`
			},
			body: JSON.stringify({ media_type: 'movie', media_id: id, watchlist: false })
		}

		const removeFromWatchlistRes = await fetch(url, options)

		if (removeFromWatchlistRes.ok) {
			return await removeFromWatchlistRes.json()
		}
	}
}
