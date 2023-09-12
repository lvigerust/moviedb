import { TMDB_ACCESS_TOKEN } from '$env/static/private'
import type { ApiResponse, Movie } from '$types'
import { error, redirect } from '@sveltejs/kit'

type AccessTokenData = {
	account_id: string
	access_token: string
	success: boolean
	status_message: string
	status_code: number
}

export const load = async ({ fetch, cookies }) => {
	const accessToken = async () => {
		const url = 'https://api.themoviedb.org/4/auth/access_token'
		const options = {
			method: 'POST',
			headers: {
				accept: 'application/json',
				'content-type': 'application/json',
				Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`
			},
			body: JSON.stringify({ request_token: cookies.get('requestToken') })
		}

		const accessTokenRes = await fetch(url, options)

		if (accessTokenRes.ok) {
			const accessTokenData: AccessTokenData = await accessTokenRes.json()

			cookies.set('accountId', accessTokenData.account_id)

			return accessTokenData
		} else throw redirect(301, '/login')
	}

	const getWatchlistMovies = async () => {
		const accountId = await accessToken()

		const url = `https://api.themoviedb.org/4/account/${accountId.account_id}/movie/watchlist?page=1&language=en-US`
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
		} else throw error(404, 'Error getting watchlist')
	}

	/* Meta Information */
	const getMetaInformation = async () => {
		const title = 'Watchlist'

		const description = 'Watchlists'

		return {
			title,
			description
		}
	}

	return {
		accessToken: accessToken(),
		watchlistMovies: getWatchlistMovies(),
		meta: getMetaInformation()
	}
}

export const actions = {
	logout: async ({ cookies }) => {
		cookies.delete('requestToken')
		cookies.delete('accountId')

		throw redirect(301, '/')
	}
}
