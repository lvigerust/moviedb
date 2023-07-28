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
	belongs_to_collection: null | {
		backdrop_path: string
		id: number
		name: string
		poster_path: string
	}
	images: {
		id: number
		backdrops: Image[] | null
		logos: Image[] | null
		posters: Image[] | null
	}
	budget: number
	genres: object[]
	homepage: string | null
	imdb_id: string | null
	production_companies: object[]
	production_countries: object[]
	revenue: number
	runtime: number | null
	spoken_languages: object[]
	status: string
	tagline: string | null
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
