import { TMDB_ACCESS_TOKEN } from '$env/static/private'
import type { ApiResponse, Movie, Show } from '$types'
import { error, redirect } from '@sveltejs/kit'

type List = {
	description: string
	favorite_count: number
	id: number
	item_count: number
	iso_639_1: string
	list_type: string
	name: string
	poster_path: string
}

// export const load = async ({ fetch, cookies, locals }) => {
// 	const checkSession = async () => {
// 		if (!cookies.get('session')) {
// 			console.log('No session found, redirecting to login page.')
// 			throw redirect(301, '/login')
// 		}
// 	}

// 	const getWatchlistMovies = async () => {
// 		await checkSession()

// 		const url = `https://api.themoviedb.org/3/account/${
// 			locals.user?.id
// 		}/watchlist/movies?language=en-US&page=1&session_id=${cookies.get('session')}`

// 		const options = {
// 			method: 'GET',
// 			headers: {
// 				accept: 'application/json',
// 				Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`
// 			}
// 		}
// 		const watchlistMoviesRes = await fetch(url, options)

// 		if (watchlistMoviesRes.ok) {
// 			const watchlistMoviesData: ApiResponse<Movie> = await watchlistMoviesRes.json()
// 			return watchlistMoviesData
// 		} else throw error(404, "Couldn't get watchlist movies.")
// 	}

// 	const getWatchlistShows = async () => {
// 		await checkSession()
// 		const url = `https://api.themoviedb.org/3/account/${
// 			locals.user?.id
// 		}/watchlist/tv?language=en-US&page=1&session_id=${cookies.get('session')}`

// 		const options = {
// 			method: 'GET',
// 			headers: {
// 				accept: 'application/json',
// 				Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`
// 			}
// 		}
// 		const watchlistShowsRes = await fetch(url, options)

// 		if (watchlistShowsRes.ok) {
// 			const watchlistShowsData: ApiResponse<Show> = await watchlistShowsRes.json()
// 			return watchlistShowsData
// 		} else throw error(404, "Couldn't get watchlist shows.")
// 	}

// 	const getLists = async () => {
// 		await checkSession()
// 		const url = `https://api.themoviedb.org/3/account/${
// 			locals.user?.id
// 		}/lists?session_id=${cookies.get('session')}`

// 		const options = {
// 			method: 'GET',
// 			headers: {
// 				accept: 'application/json',
// 				Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`
// 			}
// 		}
// 		const listsRes = await fetch(url, options)

// 		if (listsRes.ok) {
// 			const listsData: ApiResponse<List> = await listsRes.json()
// 			return listsData
// 		} else throw error(404, "Couldn't get lists.")
// 	}

// 	return {
// 		streamed: {
// 			watchlistMovies: getWatchlistMovies(),
// 			watchlistShows: getWatchlistShows(),
// 			lists: getLists()
// 		}
// 	}
// }
