import { TMDB_ACCESS_TOKEN } from '$env/static/private'
import { redirect } from '@sveltejs/kit'

export const load = async () => {
	return {
		meta: {
			title: 'Account'
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
