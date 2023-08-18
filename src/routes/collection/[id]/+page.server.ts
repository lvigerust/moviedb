import { TMDB_ACCESS_TOKEN, TMDB_BASE_URL } from '$env/static/private'
import { MediaType, type Collection } from '$types'
import { error } from '@sveltejs/kit'

export const load = async ({ fetch, params }) => {
	const getMovieCollection = async (id: string) => {
		const url = `${TMDB_BASE_URL}/collection/${id}?language=en-US`
		const options = {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`
			}
		}

		const movieCollectionRes = await fetch(url, options)

		if (movieCollectionRes.ok) {
			const movieCollectionData: Collection = await movieCollectionRes.json()

			movieCollectionData.media_type = MediaType.Movie
			return movieCollectionData
		} else throw error(404, "Couldn't get collection, please try again.")
	}

	return {
		movieCollection: getMovieCollection(params.id)
	}
}
