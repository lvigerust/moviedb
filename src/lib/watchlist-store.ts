import type { Movie } from '$types'
import { writable } from 'svelte/store'

export function createWatchlistStore(initialList: Movie[]) {
	const watchlist = writable(initialList)

	function removeFromWatchList(movieId: number) {
		watchlist.update((watchlist) => {
			const index = watchlist.findIndex((movie) => movie.id === movieId)

			if (index !== -1) {
				watchlist.splice(index, 1)
			}
			return watchlist
		})
	}

	return {
		...watchlist,
		removeFromWatchList
	}
}
