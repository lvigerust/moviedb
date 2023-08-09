export interface ApiResponse<T> {
	page: number
	results: T[]
	total_pages: number
	total_results: number
}

export interface Media {
	adult: boolean
	backdrop_path: string
	id: number
	original_language: OriginalLanguage
	overview: string
	popularity: number
	poster_path: string
	media_type: MediaType
	genre_ids: number[]
	vote_average: number
	vote_count: number
}

export enum OriginalLanguage {
	En = 'en',
	Fr = 'fr',
	Ja = 'ja',
	Pl = 'pl',
	De = 'de',
	It = 'it',
	Sv = 'sv'
}

export enum MediaType {
	Movie = 'movie',
	TV = 'tv',
	Person = 'person'
}

export interface Images {
	backdrops: Image[]
	logos: Image[]
	posters: Image[]
}

interface Image {
	aspect_ratio: number
	height: number
	iso_639_1: null | string
	file_path: string
	vote_average: number
	vote_count: number
	width: number
}

export interface ProductionCompany {
	iso_3166_1: string
	id: number
	logo_path: null | string
	name: string
	origin_country: string
}

export interface ProductionCountry {
	iso_3166_1: string
	name: string
}

export interface SpokenLanguage {
	english_name: string
	iso_639_1: string
	name: string
}
