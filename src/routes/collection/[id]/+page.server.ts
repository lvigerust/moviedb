import { MediaType, type Collection } from '$types'

export const load = async ({ fetch, params }) => {
	const getMovieCollection = async (id: string) => {
		const url = `https://api.themoviedb.org/3/collection/${id}?language=en-US`
		const options = {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization:
					'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MjNkYTE4ZDg5ZjAwOGNmODMwODQ0MjU5ODgzYjRjNiIsInN1YiI6IjVkNWRlNjE3MTg4NjRiMDAxNGZiNTNiZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.voV_m9XA3hLNGWxQIbg3k4K3-fhWv9AavLCP5gmuzSg'
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
