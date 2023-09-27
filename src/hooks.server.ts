import { authenticateUser, createSession } from '$lib/server/auth'
import { redirect } from '@sveltejs/kit'

export const handle = async ({ event, resolve }) => {
	event.locals.user = await authenticateUser(event)

	if (event.url.pathname.startsWith('/user')) {
		if (
			event.url.searchParams.get('request_token') &&
			event.url.searchParams.get('approved') === 'true'
		) {
			await createSession(event)
		}

		if (!event.locals.user) {
			console.log('Could not authenticate user. Redirecting to login page...')
			throw redirect(303, '/login')
		}
	}

	const response = await resolve(event)

	return response
}
