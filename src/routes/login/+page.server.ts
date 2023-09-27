import { TMDB_ACCESS_TOKEN } from '$env/static/private'
import { error, redirect } from '@sveltejs/kit'

type RequestTokenData = {
	success: boolean
	expires_at: string
	request_token: string
}

export const load = async ({ fetch, cookies, locals }) => {
	const session = cookies.get('session')

	const checkSession = async () => {
		if (session && locals.user) {
			console.log('Active session found, redirecting to user page.')
			throw redirect(301, '/user')
		} else {
			if (session) {
				console.log('Session expired or revoked. Deleting session.')
				cookies.delete('session')
			}
			console.log('Getting new request token...')

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

				console.log('Setting request token cookie and returning it to +page.svelte for approval.')

				cookies.set('requestToken', requestTokenData.request_token, { maxAge: 60 * 60 })

				return requestTokenData
			} else throw error(404, 'Error getting request token.')
		}
	}

	return {
		requestToken: checkSession()
	}
}
