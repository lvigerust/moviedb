import { TMDB_ACCESS_TOKEN } from '$env/static/private'

type RequestTokenData = {
	status_message: string
	request_token: string
	success: boolean
	status_code: number
}

export const load = async ({ fetch, url, cookies }) => {
	const createRequestToken = async () => {
		const requestUrl = 'https://api.themoviedb.org/4/auth/request_token'
		const options = {
			method: 'POST',
			headers: {
				accept: 'application/json',
				'content-type': 'application/json',
				Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`
			},
			body: JSON.stringify({ redirect_to: `${url.origin}/account` })
		}

		const requestTokenRes = await fetch(requestUrl, options)

		if (requestTokenRes.ok) {
			const requestTokenData: RequestTokenData = await requestTokenRes.json()

			cookies.set('request_token', requestTokenData.request_token)

			return requestTokenData
		}
	}

	return {
		request_token: createRequestToken()
	}
}
