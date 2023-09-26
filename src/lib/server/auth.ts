import { TMDB_ACCESS_TOKEN } from '$env/static/private'

export const authenticateUser = async (session: string) => {
	const url = `https://api.themoviedb.org/3/account?session_id=${session}`
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
