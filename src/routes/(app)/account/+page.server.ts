import { TMDB_ACCESS_TOKEN } from '$env/static/private'
import { redirect } from '@sveltejs/kit'

type SessionData = {
	success: boolean
	session_id: string
}

export const load = async ({ fetch, cookies, locals, url }) => {
	if (url.searchParams.get('request_token') && url.searchParams.get('approved') === 'true') {
		console.log('Request token approved. Creating session...')

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
			console.log(
				'Session ',
				sessionData.session_id,
				' created. Removing params (redirecting to /account).'
			)
			throw redirect(301, '/account')
		}
	}

	if (!cookies.get('session')) {
		console.log('No session found, redirecting to login page.')

		throw redirect(301, '/login')
	}

	return {
		meta: {
			title: 'Account',
			image1: `https://image.tmdb.org/t/p/original/${locals.user?.avatar.tmdb.avatar_path}`
		}
	}
}

export const actions = {
	logout: async ({ cookies, fetch }) => {
		const url = 'https://api.themoviedb.org/3/authentication/session'
		const options = {
			method: 'DELETE',
			headers: {
				accept: 'application/json',
				'content-type': 'application/json',
				Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`
			},
			body: JSON.stringify({ session_id: cookies.get('session') })
		}

		const logoutRes = await fetch(url, options)

		if (logoutRes.ok) {
			cookies.delete('session')
			throw redirect(301, '/')
		} else throw redirect(301, '/')
	}
}
