import { TMDB_ACCESS_TOKEN } from '$env/static/private'
import { MediaType, type Collection } from '$types'

export const load = async ({ fetch, params }) => {
	const getMovieCollection = async (id: string) => {
		const url = `https://api.themoviedb.org/3/collection/${id}?language=en-US`
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
		} else throw new Error("Couldn't get collection info, please try again.")
	}

	return {
		movieCollection: getMovieCollection(params.id)
	}
}
