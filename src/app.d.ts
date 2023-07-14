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
}

export {}
