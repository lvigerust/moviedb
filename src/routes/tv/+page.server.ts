import { TMDB_API_KEY } from '$env/static/private'

export const load = async ({ fetch }) => {
	const getPopularShows = async () => {
		const popularShowsRes = await fetch(
			`https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_API_KEY}`
		)
		const popularShowsData = await popularShowsRes.json()
		const popularShows: Movie[] = popularShowsData.results
		return popularShows
	}

	return {
		popularMovies: getPopularShows(),
		pageTitle: 'TV Shows'
	}
}
