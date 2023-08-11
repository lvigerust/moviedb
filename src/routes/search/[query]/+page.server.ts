import { TMDB_API_KEY } from '$env/static/private'
import type { ApiResponse, Movie, Show } from '$types'
import { dynamicSort } from '$utils'

export const load = async ({ fetch, params }) => {
	const getSearchResults = async (query: string) => {
		const searchRes = await fetch(
			`https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&language=en-US&query=${query}`
		)
		const searchData: ApiResponse<Movie | Show> = await searchRes.json()

		function handleSearchResults(apiData: ApiResponse<Movie | Show>) {
			let movies = apiData.results.filter(function (arr) {
				return arr.media_type == 'movie'
			})
			let shows = apiData.results.filter(function (arr) {
				return arr.media_type == 'tv'
			})

			// const people = apiData.results.filter(function (arr) {
			// 	return arr.media_type == 'person'
			// })

			movies = movies
				.sort(dynamicSort('-popularity'))
				.filter((movie) => movie.popularity > 1 && movie.poster_path)
				.slice(0, 7)

			shows = shows
				.sort(dynamicSort('-popularity'))
				.filter((show) => show.popularity > 1 && show.poster_path)
				.slice(0, 7)

			const movies_popularity = movies.slice(0, 2).reduce((n, { popularity }) => n + popularity, 0)
			const shows_popularity = shows.slice(0, 2).reduce((n, { popularity }) => n + popularity, 0)

			const moviesFirst = shows_popularity < movies_popularity

			return { movies, shows, moviesFirst }
		}

		return handleSearchResults(searchData)
	}

	return {
		pageTitle: params.query,
		searchResults: getSearchResults(params.query)
	}
}
