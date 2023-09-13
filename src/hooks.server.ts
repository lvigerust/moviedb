import { TMDB_ACCESS_TOKEN } from '$env/static/private'

const getAccountDetails = async (session: string | undefined, accessToken: string) => {
	const url = `https://api.themoviedb.org/3/account?session_id=${session}`
	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization: `Bearer ${accessToken}`
		}
	}

	const accountDetailsRes = await fetch(url, options)

	if (accountDetailsRes.ok) {
		const accountDetailsData: Account = await accountDetailsRes.json()
		return accountDetailsData
	}
}

export const handle = async ({ event, resolve }) => {
	let theme: string | null = 'night'
	const newTheme = event.url.searchParams.get('theme')
	const cookieTheme = event.cookies.get('colortheme')

	if (newTheme) {
		theme = newTheme
	} else if (cookieTheme) {
		theme = cookieTheme
	}

	event.locals.user = await getAccountDetails(event.cookies.get('session'), TMDB_ACCESS_TOKEN)

	if (theme) {
		return await resolve(event, {
			transformPageChunk: ({ html }) => html.replace('data-theme=""', `data-theme="${theme}"`)
		})
	}

	return await resolve(event)
}
