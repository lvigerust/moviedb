import { TMDB_API_KEY } from '$env/static/private'
import { movies } from '$lib/watchlist.js'
import type { MovieDetails } from '$types'

export const load = async ({ fetch }) => {
	const getWatchlist = async () => {
		const watchlist: MovieDetails[] = await Promise.all(
			movies.map(async (movie) => {
				const res = await fetch(
					`https://api.themoviedb.org/3/movie/${movie}?api_key=${TMDB_API_KEY}&append_to_response=images&include_image_language=en,null`
				)
				const data = await res.json()
				data.media_type = 'movie'
				return data
			})
		)

		return { watchlist }
	}

	return {
		watchlist: getWatchlist(),
		meta: { title: 'Home' }
	}
}
