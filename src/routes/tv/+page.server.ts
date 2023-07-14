import { TMDB_API_KEY } from '$env/static/private'

export const load = async ({ fetch }) => {
	const getPopularShows = async () => {
		const popularShowsRes = await fetch(
			`https://api.themoviedb.org/3/trending/tv/week?api_key=${TMDB_API_KEY}`
		)
		const popularShowsData = await popularShowsRes.json()
		const popularShows: Show[] = popularShowsData.results
		return popularShows
	}

	return {
		popularShows: getPopularShows(),
		pageTitle: 'TV Shows'
	}
}
