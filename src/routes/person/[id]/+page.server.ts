import { TMDB_API_KEY } from '$env/static/private'
import { type CombinedCredits, type Person, type Credit, MediaType } from '$types'
import { dynamicSort, removeDuplicatesByProperty } from '$utils'

export const load = async ({ fetch, params }) => {
	const getPerson = async (id: string) => {
		const personRes = await fetch(
			`https://api.themoviedb.org/3/person/${id}?api_key=${TMDB_API_KEY}`
		)
		const personData: Person = await personRes.json()
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

	const getTopMovies = async (): Promise<Credit[]> => {
		const person = await getPerson(params.id)

		if (person.known_for_department === 'Directing') {
			const allMovies = (await getCombinedCredits(params.id)).crew

			return removeDuplicatesByProperty(allMovies, 'id')
				.sort(dynamicSort('-popularity'))
				.slice(0, 14)
		} else {
			const allMovies = (await getCombinedCredits(params.id)).cast

			return removeDuplicatesByProperty(allMovies, 'id')
				.sort(dynamicSort('-popularity'))
				.slice(0, 14)
		}
	}

	/* Meta Information */
	const pageTitle = async () => {
		const data = await getPerson(params.id)

		return `${data.name}`
	}

	return {
		pageTitle: pageTitle(),
		person: getPerson(params.id),
		personMovieCredits: getCombinedCredits(params.id),
		streamed: {
			topMovies: getTopMovies()
		}
	}
}
