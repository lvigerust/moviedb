import { TMDB_API_KEY } from '$env/static/private'
import { type CombinedCredits, MediaType, type PersonDetails, type CreditMedia } from '$types'
import { dynamicSort, removeDuplicatesByProperty } from '$utils'

export const load = async ({ fetch, params }) => {
	const getPerson = async (id: string) => {
		const personRes = await fetch(
			`https://api.themoviedb.org/3/person/${id}?api_key=${TMDB_API_KEY}`
		)
		const personData: PersonDetails = await personRes.json()
		personData.media_type = MediaType.Person
		return personData
	}

	const getCombinedCredits = async (id: string) => {
		const personMovieCredits = await fetch(
			`https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${TMDB_API_KEY}`
		)
		const personMovieCreditsData: CombinedCredits = await personMovieCredits.json()
		return personMovieCreditsData
	}

	const getTopCredits = async (): Promise<CreditMedia[]> => {
		const person = await getPerson(params.id)

		if (person.known_for_department === 'Directing') {
			const topCredits = (await getCombinedCredits(params.id)).crew

			return removeDuplicatesByProperty(topCredits, 'id')
				.sort(dynamicSort('-popularity'))
				.slice(0, 14)
		} else {
			const topCredits = (await getCombinedCredits(params.id)).cast

			return removeDuplicatesByProperty(topCredits, 'id')
				.sort(dynamicSort('-popularity'))
				.slice(0, 14)
		}
	}

	/* Meta Information */
	const getMetaInformation = async () => {
		const data = await getPerson(params.id)

		const metaTitle = data.name
		const title = metaTitle

		const image1 = `https://image.tmdb.org/t/p/w342/${data.profile_path}`

		const description = data.biography

		return {
			title,
			metaTitle,
			image1,
			description
		}
	}

	return {
		meta: getMetaInformation(),
		person: getPerson(params.id),
		personMovieCredits: getCombinedCredits(params.id),
		streamed: {
			topMovies: getTopCredits()
		}
	}
}
