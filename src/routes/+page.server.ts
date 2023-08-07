import { TMDB_API_KEY } from '$env/static/private'
import { movies } from '$lib/watchlist.js'
import type { MovieDetails } from '$types'
import { redirect } from '@sveltejs/kit'

export const load = async ({ fetch }) => {
	const getWatchlist = async () => {
		const watchlist: MovieDetails[] = await Promise.all(
			movies.map(async (movie) => {
				const res = await fetch(
					`https://api.themoviedb.org/3/movie/${movie}?api_key=${TMDB_API_KEY}&append_to_response=images&include_image_language=en,null`
				)
				const data = await res.json()
				return data
			})
		)

		// const tvShows: ShowDetails[] = await Promise.all(
		// 	tvList.map(async (show) => {
		// 		const res = await fetch(
		// 			`https://api.themoviedb.org/3/tv/${show}?api_key=${TMDB_API_KEY}&append_to_response=images&include_image_language=en,null`
		// 		)
		// 		const data = await res.json()
		// 		return data
		// 	})
		// )

		return { watchlist }
	}

	return {
		watchlist: getWatchlist()
	}
}

export const actions = {
	setTheme: async ({ url, cookies }) => {
		const theme = url.searchParams.get('theme')
		const redirectTo = url.searchParams.get('redirectTo')

		if (theme) {
			cookies.set('colortheme', theme, {
				path: '/',
				maxAge: 60 * 60 * 24 * 365
			})
		}

		throw redirect(303, redirectTo ?? '/')
	}
}
