import type { MediaType } from './common'

// List of credits belonging to a person
export interface CombinedCredits {
	cast: CreditMedia[]
	crew: CreditMedia[]
	id: number
}

// Movie or TV Show where a person is credited
export interface CreditMedia {
	adult: boolean
	backdrop_path: null | string
	genre_ids: number[]
	id: number
	original_language: string
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
	origin_country?: string[]
	original_name?: string
	first_air_date?: string
	name?: string
	episode_count?: number
	department?: Department
	job?: string
}

// Credits belonging to a Movie
export interface Credits {
	id: number
	cast: Credit[]
	crew: Credit[]
}

// A person's credit to a specfic movie
export interface Credit {
	adult: boolean
	gender: number
	id: number
	known_for_department: Department
	name: string
	original_name: string
	popularity: number
	profile_path: null | string
	cast_id?: number
	character?: string
	credit_id: string
	order?: number
	department?: Department
	job?: string
}

export interface PersonDetails {
	adult?: boolean
	also_known_as?: string[]
	biography?: string
	birthday?: string
	deathday?: string
	gender?: number
	homepage?: string
	id: number
	imdb_id?: string
	known_for_department?: Department
	name: string
	place_of_birth?: string
	popularity?: number
	profile_path?: string
	media_type: MediaType
}

export type Department =
	| 'Creator'
	| 'Crew'
	| 'Directing'
	| 'Production'
	| 'Sound'
	| 'Writing'
	| 'Acting'
	| 'Art'
	| 'Camera'
	| 'Costume & Make-Up'
	| 'Editing'
	| 'Visual Effects'
	| 'Lighting'
