import { TMDB_ACCESS_TOKEN } from '$env/static/private'
import { error, redirect } from '@sveltejs/kit'

type RequestTokenData = {
	status_message: string
	request_token: string
	success: boolean
	status_code: number
}

export const load = async ({ fetch, cookies }) => {
	const requestToken = async () => {
		const activeRequestToken = cookies.get('requestToken')

		if (!activeRequestToken) {
			const url = 'https://api.themoviedb.org/4/auth/request_token'
			const options = {
				method: 'POST',
				headers: {
					accept: 'application/json',
					'content-type': 'application/json',
					Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`
				},
				body: JSON.stringify({ redirect_to: 'http://localhost:5173/account' })
			}

			const requestTokenRes = await fetch(url, options)

			if (requestTokenRes.ok) {
				const requestTokenData: RequestTokenData = await requestTokenRes.json()

				cookies.set('requestToken', requestTokenData.request_token)

				return requestTokenData
			} else throw error(404, 'Error')
		} else throw redirect(302, '/account')
	}

	return {
		requestToken: requestToken()
	}
}
