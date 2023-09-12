import { TMDB_ACCESS_TOKEN } from '$env/static/private'
import { error } from '@sveltejs/kit'

type RequestTokenData = {
	success: boolean
	expires_at: string
	request_token: string
}

export const load = async ({ fetch, cookies }) => {
	const requestToken = async () => {
		const urlRequest = 'https://api.themoviedb.org/3/authentication/token/new'
		const options = {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`
			}
		}

		const requestTokenRes = await fetch(urlRequest, options)

		if (requestTokenRes.ok) {
			const requestTokenData: RequestTokenData = await requestTokenRes.json()
			cookies.set('requestToken', requestTokenData.request_token)

			return requestTokenData
		} else throw error(404, 'Error getting request token.')
	}

	return {
		requestToken: requestToken()
	}
}
