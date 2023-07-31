import type { Image } from './media'

export interface Movie {
	poster_path: string | null
	adult: boolean
	overview: string
	release_date: string
	genre_ids: number[]
	id: number
	original_title: string
	original_language: string
	title: string
	backdrop_path: string | null
	popularity: number
	vote_count: number
	video: boolean
	vote_average: number
	media_type: string
}

export interface MovieDetails extends Movie {
	belongs_to_collection: {
		backdrop_path: string
		id: number
		name: string
		poster_path: string
	} | null
	images: {
		id: number
		backdrops: Image[] | null
		logos: Image[] | null
		posters: Image[] | null
	}
	budget: number
	genres: { id: number; name: string }[]
	homepage: string | null
	imdb_id: string | null
	production_companies: { id: number; logo_path: string; name: string; origin_country: string }[]
	production_countries: { iso_3166_1: string; name: string }[]
	revenue: number
	runtime: number | null
	spoken_languages: { english_name: string; iso_639_1: string; name: string }[]
	status: string
	tagline: string | null
}

export type WatchProvider = {
	logo_path: string
	provider_id: number
	provider_name: string
	display_priority: number
}

export type WatchProviders = {
	id: number
	results: Record<
		'NO',
		{ link: string; rent: WatchProvider[]; flatrate: WatchProvider[]; buy: WatchProvider[] } | null
	>
}

export interface Collection {
	backdrop_path: string
	id: number
	media_type: string
	name: string
	overview: string
	parts: MovieDetails[]
	poster_path: string
}
