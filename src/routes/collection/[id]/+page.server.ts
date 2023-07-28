import { TMDB_API_KEY } from '$env/static/private'
import type { Collection } from '$types'

export const load = async ({ fetch, params }) => {
	const getMovieCollection = async (id: string) => {
		const movieCollectionDetails = await fetch(
			`https://api.themoviedb.org/3/collection/${id}?api_key=${TMDB_API_KEY}&language=en-US`
		)
		const movieCollectionData: Collection = await movieCollectionDetails.json()
		movieCollectionData.media_type = 'movie'
		return movieCollectionData
	}

	return {
		collection: getMovieCollection(params.id)
	}
}
