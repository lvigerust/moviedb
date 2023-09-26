import { TMDB_ACCESS_TOKEN } from '$env/static/private'
import { error, redirect } from '@sveltejs/kit'

type RequestTokenData = {
	success: boolean
	expires_at: string
	request_token: string
}

export const load = async ({ fetch, cookies }) => {
	const session = cookies.get('session')

	const checkSession = async () => {
		if (session) {
			console.log('Session found, redirecting to account page.')
			throw redirect(301, '/account')
		} else {
			console.log('No session found. Getting request token...')

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
				console.log('Setting request token cookie.')
				console.log('Returning request token to +page.svelte for approval.')

				cookies.set('requestToken', requestTokenData.request_token)

				return requestTokenData
			} else throw error(404, 'Error getting request token.')
		}
	}

	return {
		requestToken: checkSession()
	}
}
