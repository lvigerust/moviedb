import { TMDB_API_KEY } from '$env/static/private'
import { MediaType, type Movie, type MovieDetails } from '$types'

export const load = async ({ fetch, params }) => {
	const getMovieDetails = async (id: string) => {
		const movieDetailsRes = await fetch(
			`https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&append_to_response=images`
		)
		const movieDetailsData: MovieDetails = await movieDetailsRes.json()
		movieDetailsData.media_type = MediaType.Movie
		return movieDetailsData
	}

	const getMovieCredits = async (id: string) => {
		const movieCreditsRes = await fetch(
			`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${TMDB_API_KEY}`
		)
		const movieCreditsData = await movieCreditsRes.json()
		return movieCreditsData
	}

	const getWatchProviders = async (id: string) => {
		const watchProvidersRes = await fetch(
			`https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${TMDB_API_KEY}`
		)
		const watchProvidersData = await watchProvidersRes.json()
		return watchProvidersData
	}

	/* Streamed promises */
	const getRecommendations = async (id: string) => {
		const recommendationsRes = await fetch(
			`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${TMDB_API_KEY}`
		)
		return (await recommendationsRes.json()).results as Movie[]
	}

	const getSimilar = async (id: string) => {
		const similarRes = await fetch(
			`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${TMDB_API_KEY}`
		)
		return (await similarRes.json()).results as Movie[]
	}

	const getExternalIDs = async (id: string) => {
		const externalIDsRes = await fetch(
			`https://api.themoviedb.org/3/movie/${id}/external_ids?api_key=${TMDB_API_KEY}`
		)
		return await externalIDsRes.json()
	}

	/* Meta Information */
	const pageTitle = async () => {
		const data = await getMovieDetails(params.id)

		const year = `${new Date(data.release_date).getFullYear()}`

		return `${data.title} (${year})`
	}

	return {
		movieDetails: getMovieDetails(params.id),
		movieCredits: getMovieCredits(params.id),
		watchProviders: getWatchProviders(params.id),
		pageTitle: pageTitle(),
		streamed: {
			recommendations: getRecommendations(params.id),
			similar: getSimilar(params.id),
			external_ids: getExternalIDs(params.id)
		}
	}
}
