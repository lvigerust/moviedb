// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}

	interface Movie {
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
	}

	interface MovieDetails extends Movie {
		belongs_to_collection: null | object
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
		media_type: string
	}

	interface Show {
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

	interface ShowDetails extends Show {
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
}

export {}
