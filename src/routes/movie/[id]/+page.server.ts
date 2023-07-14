import { TMDB_API_KEY } from '$env/static/private'

export const load = async ({ fetch, params }) => {
	const getMovieDetails = async (id: string) => {
		const movieDetailsRes = await fetch(
			`https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&language=en-US`
		)
		const movieDetailsData: MovieDetails = await movieDetailsRes.json()
		movieDetailsData.media_type = 'movie'
		return movieDetailsData
	}

	const pageTitle = async () => {
		const data = await getMovieDetails(params.id)

		return `${data.title} (${new Date(data.release_date).getFullYear()})`
	}

	return {
		movieDetails: getMovieDetails(params.id),
		pageTitle: pageTitle()
	}
}
