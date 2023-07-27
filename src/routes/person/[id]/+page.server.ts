import { TMDB_API_KEY } from '$env/static/private'
import type { CombinedCredits, PersonDetails } from '$types'

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

	return {
		person: getPersonDetails(params.id),
		personMovieCredits: getPersonMovieCredits(params.id)
	}
}
