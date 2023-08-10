import type {
	Images,
	Media,
	MediaType,
	ProductionCompany,
	ProductionCountry,
	SpokenLanguage
} from '$types'

export interface Movie extends Media {
	title: string
	original_title: string
	release_date: string
	video: boolean
}

export interface MovieDetails extends Movie {
	belongs_to_collection?: Collection
	budget: number
	genres: { id: number; name: string }[]
	homepage: string
	imdb_id: string
	production_companies: ProductionCompany[]
	production_countries: ProductionCountry[]
	revenue: number
	runtime: number
	status: string
	spoken_languages: SpokenLanguage[]
	tagline: string
	images?: Images
}

export interface Collection {
	id: number
	name: string
	overview: string
	poster_path: string
	backdrop_path: string
	parts: Part[]
	media_type: MediaType
}

interface Part {
	adult: boolean
	backdrop_path: string
	id: number
	title: string
	original_language: string
	original_title: string
	overview: string
	poster_path: string
	media_type: MediaType
	genre_ids: number[]
	popularity: number
	release_date: string
	video: boolean
	vote_average: number
	vote_count: number
}
