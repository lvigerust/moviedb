import { authenticateUser } from '$lib/server/auth'

export const handle = async ({ event, resolve }) => {
	const session = event.cookies.get('session')

	if (session) {
		event.locals.user = await authenticateUser(session)
	}

	let theme: string | null = 'night'
	const newTheme = event.url.searchParams.get('theme')
	const cookieTheme = event.cookies.get('colortheme')

	if (newTheme) {
		theme = newTheme
	} else if (cookieTheme) {
		theme = cookieTheme
	}

	if (theme) {
		return await resolve(event, {
			transformPageChunk: ({ html }) => html.replace('data-theme=""', `data-theme="${theme}"`)
		})
	}

	return await resolve(event)
}
