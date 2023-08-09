import type { MediaType, OriginalLanguage } from '$types'

export interface CombinedCredits {
	cast: Credit[]
	crew: Credit[]
	id: number
}

export interface Credit {
	adult: boolean
	backdrop_path: null | string
	genre_ids: number[]
	id: number
	original_language: OriginalLanguage
	original_title?: string
	overview: string
	popularity: number
	poster_path: null | string
	release_date?: string
	title?: string
	video?: boolean
	vote_average: number
	vote_count: number
	character?: string
	credit_id: string
	order?: number
	media_type: MediaType
	origin_country?: OriginCountry[]
	original_name?: string
	first_air_date?: string
	name?: string
	episode_count?: number
	department?: Department
	job?: string
}

enum Department {
	Creator = 'Creator',
	Crew = 'Crew',
	Directing = 'Directing',
	Production = 'Production',
	Sound = 'Sound',
	Writing = 'Writing'
}

enum OriginCountry {
	De = 'DE',
	GB = 'GB',
	SE = 'SE',
	Us = 'US'
}

export interface Person {
	adult: boolean
	also_known_as: string[]
	biography: string
	birthday: string
	deathday: null
	gender: number
	homepage: null
	id: number
	imdb_id: string
	known_for_department: Department
	name: string
	place_of_birth: string
	popularity: number
	profile_path: string
	media_type: MediaType
}
