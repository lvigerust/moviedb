import { TMDB_ACCESS_TOKEN } from '$env/static/private'
import { error, redirect } from '@sveltejs/kit'

type RequestTokenData = {
	status_message: string
	request_token: string
	success: boolean
	status_code: number
}

export const load = async ({ fetch, cookies, url }) => {
	const requestToken = async () => {
		const urlRequest = 'https://api.themoviedb.org/4/auth/request_token'
		const options = {
			method: 'POST',
			headers: {
				accept: 'application/json',
				'content-type': 'application/json',
				Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`
			},
			body: JSON.stringify({ redirect_to: `${url.origin}/account` })
		}

		const requestTokenRes = await fetch(urlRequest, options)

		if (requestTokenRes.ok) {
			const requestTokenData: RequestTokenData = await requestTokenRes.json()

			if (!cookies.get('accountId')) {
				cookies.set('requestToken', requestTokenData.request_token)
				return requestTokenData
			} else throw redirect(301, '/account')
		} else throw error(404, 'Error')
	}

	return {
		requestToken: requestToken()
	}
}
