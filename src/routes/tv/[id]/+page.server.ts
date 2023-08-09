import { TMDB_API_KEY } from '$env/static/private'
import { MediaType, type ShowDetails } from '$types'

export const load = async ({ fetch, params }) => {
	const getShowDetails = async (id: string) => {
		const showDetailsRes = await fetch(
			`https://api.themoviedb.org/3/tv/${id}?api_key=${TMDB_API_KEY}&language=en-US`
		)
		const showDetailsData: ShowDetails = await showDetailsRes.json()
		showDetailsData.media_type = MediaType.TV
		return showDetailsData
	}

	const pageTitle = async () => {
		const data = await getShowDetails(params.id)

		let year = `TV Series ${new Date(data.first_air_date).getFullYear()}`
		if (data.status === 'Returning Series') {
			year = year + '-'
		} else year = year + `-${new Date(data.last_air_date).getFullYear()}`

		return `${data.name} (${year})`
	}

	return {
		showDetails: getShowDetails(params.id),
		pageTitle: pageTitle()
	}
}
