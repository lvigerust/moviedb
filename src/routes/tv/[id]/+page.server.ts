import { TMDB_API_KEY } from '$env/static/private'
import { MediaType, type ShowDetails, type Credits } from '$types'

export interface ProviderOptions {
	link: string
	flatrate?: WatchProvider[]
	buy?: WatchProvider[]
	rent?: WatchProvider[]
}

export interface WatchProvider {
	logo_path: string
	provider_id: string
	provider_name: string
	display_priority: string
}

export const load = async ({ fetch, params }) => {
	const getShowDetails = async (id: string) => {
		const showDetailsRes = await fetch(
			`https://api.themoviedb.org/3/tv/${id}?api_key=${TMDB_API_KEY}&language=en-US`
		)
		const showDetailsData: ShowDetails = await showDetailsRes.json()
		showDetailsData.media_type = MediaType.TV
		return showDetailsData
	}

	const getShowCredits = async (id: string) => {
		const showCreditsRes = await fetch(
			`https://api.themoviedb.org/3/tv/${id}/aggregate_credits?api_key=${TMDB_API_KEY}`
		)

		if (showCreditsRes.ok) {
			return (await showCreditsRes.json()) as Credits
		} else throw new Error("Couldn't get cast & crew, please try again.")
	}

	const getWatchProviders = async (id: string) => {
		const watchProvidersRes = await fetch(
			`https://api.themoviedb.org/3/tv/${id}/watch/providers?api_key=${TMDB_API_KEY}`
		)

		if (watchProvidersRes.ok) {
			return (await watchProvidersRes.json()).results.NO as ProviderOptions
		} else throw new Error("Couldn't get watch providers, please try again.")
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
		pageTitle: pageTitle(),
		streamed: {
			watchProviders: getWatchProviders(params.id),
			credits: getShowCredits(params.id)
		}
	}
}
