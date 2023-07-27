export interface Show {
	poster_path: string | null
	popularity: number
	id: number
	backdrop_path: string | null
	vote_average: number
	overview: string
	first_air_date: string
	origin_country: string[]
	genre_ids: number[]
	original_language: string
	vote_count: number
	name: string
	original_name: string
}

export interface ShowDetails extends Show {
	created_by: object[]
	episode_run_time: number[]
	genres: object[]
	homepage: string
	in_production: boolean
	languages: string[]
	last_air_date: string
	last_episode_to_air: object
	next_episode_to_air: null
	networks: object[]
	number_of_episodes: number
	number_of_seasons: number
	origin_country: string[]
	production_companies: object[]
	production_countries: object[]
	seasons: object[]
	spoken_languages: object[]
	status: string
	tagline: string
	type: string
	media_type: string
}
