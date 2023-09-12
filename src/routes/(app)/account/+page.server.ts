import { TMDB_ACCESS_TOKEN } from '$env/static/private'
import { redirect } from '@sveltejs/kit'

type SessionData = {
	success: boolean
	session_id: string
}

type Account = {
	avatar: {
		gravatar: { hash: string }
		tmdb: { avatar_path: string | null }
	}
	id: number
	iso_639_1: string
	iso_3166_1: string
	name: string
	include_adult: boolean
	username: string
}

export const load = async ({ fetch, cookies }) => {
	const createSession = async () => {
		if (!cookies.get('session')) {
			const url = 'https://api.themoviedb.org/3/authentication/session/new'
			const options = {
				method: 'POST',
				headers: {
					accept: 'application/json',
					'content-type': 'application/json',
					Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`
				},
				body: JSON.stringify({ request_token: cookies.get('requestToken') })
			}

			const sessionRes = await fetch(url, options)

			if (sessionRes.ok) {
				const sessionData: SessionData = await sessionRes.json()

				cookies.set('session', sessionData.session_id, {
					maxAge: 60 * 60 * 24 * 7
				})
			} else throw redirect(302, '/login')
		}
	}

	const getAccountDetails = async () => {
		const url = `https://api.themoviedb.org/3/account?session_id=${cookies.get('session')}`
		const options = {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`
			}
		}

		const accountDetailsRes = await fetch(url, options)

		if (accountDetailsRes.ok) {
			const accountDetailsData: Account = await accountDetailsRes.json()
			return accountDetailsData
		}
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
		meta: getMetaInformation(),
		session: createSession(),
		account: getAccountDetails()
	}
}
export const actions = {
	logout: async ({ cookies }) => {
		cookies.delete('session')

		throw redirect(301, '/')
	}
}
