import { TMDB_API_KEY } from '$env/static/private'
import type { ApiResponse, Show } from '$types'

export const load = async ({ fetch }) => {
	const getPopularShows = async () => {
		const popularShowsRes = await fetch(
			`https://api.themoviedb.org/3/trending/tv/week?api_key=${TMDB_API_KEY}`
		)

		if (popularShowsRes.ok) {
			const popularShowsData: ApiResponse<Show> = await popularShowsRes.json()
			return popularShowsData
		} else throw new Error("Couldn't get popular TV shows, please try again later.")
	}

	return {
		popularShows: getPopularShows(),
		pageTitle: 'TV Shows'
	}
}
