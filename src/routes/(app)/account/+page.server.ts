import { TMDB_ACCESS_TOKEN } from '$env/static/private'
import { redirect } from '@sveltejs/kit'

type SessionData = {
	success: boolean
	session_id: string
}

export const load = async ({ fetch, cookies, locals }) => {
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

	return {
		meta: { title: locals.user?.name ?? locals.user?.username ?? 'Account' },
		session: createSession()
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
		}
	}
}
