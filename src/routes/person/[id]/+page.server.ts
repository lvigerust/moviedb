import { TMDB_API_KEY } from '$env/static/private'

export const load = async ({ fetch, params }) => {
	const getPersonDetails = async (id: string) => {
		const personDetails = await fetch(
			`https://api.themoviedb.org/3/person/${id}?api_key=${TMDB_API_KEY}`
		)
		const personData = await personDetails.json()
		personData.media_type = 'person'
		return personData
	}

	return {
		person: getPersonDetails(params.id)
	}
}
