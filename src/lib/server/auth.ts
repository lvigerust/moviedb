import { TMDB_ACCESS_TOKEN } from '$env/static/private'
import { redirect, type RequestEvent } from '@sveltejs/kit'

type SessionData = {
	success: boolean
	session_id: string
}

export const authenticateUser = async (event: RequestEvent) => {
	const { cookies } = event

	const url = `https://api.themoviedb.org/3/account?session_id=${cookies.get('session')}`
	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`
		}
	}

	const accountDetailsRes = await fetch(url, options)

	if (accountDetailsRes.ok) {
		const accountDetailsData: User = await accountDetailsRes.json()
		return accountDetailsData
	} else return null
}

export const createSession = async (event: RequestEvent) => {
	console.log('Request token approved. Creating session...')

	const url = 'https://api.themoviedb.org/3/authentication/session/new'
	const options = {
		method: 'POST',
		headers: {
			accept: 'application/json',
			'content-type': 'application/json',
			Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`
		},
		body: JSON.stringify({ request_token: event.cookies.get('requestToken') })
	}

	const sessionRes = await fetch(url, options)

	if (sessionRes.ok) {
		const sessionData: SessionData = await sessionRes.json()

		event.cookies.set('session', sessionData.session_id, {
			path: '/',
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			maxAge: 60 * 60 * 24 * 7 // 1 week
		})

		console.log('Session ', sessionData.session_id, ' created. Redirecting to user page.')
		throw redirect(301, '/user')
	}
}
