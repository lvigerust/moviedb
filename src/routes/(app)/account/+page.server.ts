import { TMDB_ACCESS_TOKEN } from '$env/static/private'

type AccessTokenData = {
	account_id: string
	access_token: string
	success: boolean
	status_message: string
	status_code: number
}

export const load = async ({ fetch, cookies }) => {
	const createAccessToken = async () => {
		const accessUrl = 'https://api.themoviedb.org/4/auth/access_token'
		const options = {
			method: 'POST',
			headers: {
				accept: 'application/json',
				'content-type': 'application/json',
				Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`
			},
			body: JSON.stringify({
				request_token: cookies.get('request_token')
			})
		}

		const accessTokenRes = await fetch(accessUrl, options)

		if (accessTokenRes.ok) {
			const requestTokenData: AccessTokenData = await accessTokenRes.json()

			return requestTokenData
		}
	}

	return {
		access_token: createAccessToken()
	}
}
