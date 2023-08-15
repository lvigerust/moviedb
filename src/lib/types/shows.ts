import type { Images, Media, ProductionCompany, ProductionCountry, SpokenLanguage } from '$types'

export interface Show extends Media {
	name: string
	original_name: string
	first_air_date: string
	origin_country: string[]
}

export interface ShowDetails extends Show {
	created_by: CreatedBy[]
	episode_run_time: number[]
	in_production: boolean
	languages: string[]
	last_air_date: string
	last_episode_to_air: Episode
	homepage: string
	next_episode_to_air?: Episode
	networks: Network[]
	number_of_episodes: number
	number_of_seasons: number
	production_companies: ProductionCompany[]
	production_countries: ProductionCountry[]
	seasons: Season[]
	spoken_languages: SpokenLanguage[]
	status: string
	tagline: string
	images: Images
}

interface Network {
	id: number
	logo_path: null | string
	name: string
	origin_country: string
}

interface CreatedBy {
	id: number
	credit_id: string
	name: string
	gender: number
	profile_path: string
}

interface Season {
	air_date: string | null
	episode_count: number
	id: number
	name: string
	overview: string
	poster_path: string
	season_number: number
	vote_average: number
}

export interface Episode {
	id: number
	name: string
	overview: string
	vote_average: number
	vote_count: number
	air_date: string
	episode_number: number
	episode_type: string
	production_code: string
	runtime: number
	season_number: number
	show_id: number
	still_path: string
}
