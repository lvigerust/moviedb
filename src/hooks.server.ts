import { TMDB_ACCESS_TOKEN } from '$env/static/private'
import { getAccountDetails } from '$lib/server/auth'

export const handle = async ({ event, resolve }) => {
	event.locals.user = await getAccountDetails(event.cookies.get('session'), TMDB_ACCESS_TOKEN)

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
