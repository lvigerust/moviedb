import { TMDB_API_KEY } from '$env/static/private'
import type { Movie } from '$types'

export const load = async ({ fetch, params }) => {
	const getMoviesByGenre = async (id: string) => {
		const moviesByGenreRes = await fetch(
			`https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${id}`
		)

		const moviesByGenreData = await moviesByGenreRes.json()
		return moviesByGenreData.results as Movie[]
	}

	return {
		moviesByGenre: getMoviesByGenre(params.id)
	}
}
