import { TMDB_API_KEY } from '$env/static/private'
import { dynamicSort } from '$functions'
import type { CombinedCredits, Movie, PersonDetails, Show } from '$types'
import { removeDuplicatesByProperty } from '$utils'

export const load = async ({ fetch, params }) => {
	const getPersonDetails = async (id: string) => {
		const personDetails = await fetch(
			`https://api.themoviedb.org/3/person/${id}?api_key=${TMDB_API_KEY}`
		)
		const personData: PersonDetails = await personDetails.json()
		personData.media_type = 'person'
		return personData
	}

	const getPersonMovieCredits = async (id: string) => {
		const personMovieCredits = await fetch(
			`https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${TMDB_API_KEY}`
		)
		const personMovieCreditsData: CombinedCredits = await personMovieCredits.json()

		return personMovieCreditsData
	}

	const getTopMovies = async (): Promise<(Movie | Show)[]> => {
		const person = await getPersonDetails(params.id)

		if (person.known_for_department === 'Directing') {
			const allMovies = (await getPersonMovieCredits(params.id)).crew

			return removeDuplicatesByProperty(allMovies, 'id')
				.sort(dynamicSort('-popularity'))
				.slice(0, 14)
		} else {
			const allMovies = (await getPersonMovieCredits(params.id)).cast

			return removeDuplicatesByProperty(allMovies, 'id')
				.sort(dynamicSort('-popularity'))
				.slice(0, 14)
		}
	}

	return {
		person: getPersonDetails(params.id),
		personMovieCredits: getPersonMovieCredits(params.id),
		streamed: {
			topMovies: getTopMovies()
		}
	}
}
