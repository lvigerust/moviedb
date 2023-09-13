export const getAccountDetails = async (session: string | undefined, accessToken: string) => {
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
