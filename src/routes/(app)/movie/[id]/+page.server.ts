import { TMDB_API_KEY } from '$env/static/private'
import {
	MediaType,
	type Credits,
	type Movie,
	type MovieDetails,
	type ReleaseDatesData
} from '$types'
import { error } from '@sveltejs/kit'
import type { ProviderOptions } from '../../tv/[id]/+page.server.js'

export const load = async ({ fetch, params }) => {
	const getMovieDetails = async (id: string) => {
		const movieDetailsRes = await fetch(
			`https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&append_to_response=images&include_image_language=en,null`
		)
		const movieDetailsData: MovieDetails = await movieDetailsRes.json()
		movieDetailsData.media_type = MediaType.Movie
		return movieDetailsData
	}

	/* Streamed promises */

	const getMovieCredits = async (id: string) => {
		const movieCreditsRes = await fetch(
			`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${TMDB_API_KEY}`
		)
		const movieCreditsData: Credits = await movieCreditsRes.json()
		return movieCreditsData
	}

	const getReleaseDates = async (id: string) => {
		const releaseDatesRes = await fetch(
			`https://api.themoviedb.org/3/movie/${id}/release_dates?api_key=${TMDB_API_KEY}`
		)

		if (releaseDatesRes.ok) {
			const releaseDatesData: ReleaseDatesData = await releaseDatesRes.json()

			const norwegian_relase = releaseDatesData.results.find(
				(release_date) => release_date.iso_3166_1 === 'NO'
			)

			if (norwegian_relase) {
				return norwegian_relase
			} else return null
		} else throw error(404, "Couldn't get release dates, please try again.")
	}

	const getWatchProviders = async (id: string) => {
		const watchProvidersRes = await fetch(
			`https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${TMDB_API_KEY}`
		)
		if (watchProvidersRes.ok) {
			return (await watchProvidersRes.json()).results.NO as ProviderOptions
		} else throw new Error("Couldn't get watch providers, please try again.")
	}

	const getRecommendations = async (id: string) => {
		const recommendationsRes = await fetch(
			`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${TMDB_API_KEY}`
		)
		return (await recommendationsRes.json()).results as Movie[]
	}

	const getExternalIDs = async (id: string) => {
		const externalIDsRes = await fetch(
			`https://api.themoviedb.org/3/movie/${id}/external_ids?api_key=${TMDB_API_KEY}`
		)
		return await externalIDsRes.json()
	}

	/* Meta Information */
	const getMetaInformation = async () => {
		const data = await getMovieDetails(params.id)

		const year = `${new Date(data.release_date).getFullYear()}`
		const metaTitle = data.title
		const title = `${data.title} (${year})`

		const image1 = `https://image.tmdb.org/t/p/w342/${data.poster_path}`
		const image2 = `https://image.tmdb.org/t/p/w780/${data.backdrop_path}`

		const description = data.overview

		return {
			title,
			metaTitle,
			image1,
			image2,
			description
		}
	}

	return {
		movieDetails: getMovieDetails(params.id),
		meta: getMetaInformation(),
		streamed: {
			movieCredits: getMovieCredits(params.id),
			release_dates: getReleaseDates(params.id),
			watchProviders: getWatchProviders(params.id),
			recommendations: getRecommendations(params.id),
			external_ids: getExternalIDs(params.id)
		}
	}
}
