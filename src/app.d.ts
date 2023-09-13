declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user:
				| {
						avatar: {
							gravatar: { hash: string }
							tmdb: { avatar_path: string | null }
						}
						id: number
						iso_639_1: string
						iso_3166_1: string
						name: string
						include_adult: boolean
						username: string
				  }
				| undefined
		}
		// interface PageData {}
		// interface Platform {}
	}

	type Account = {
		avatar: {
			gravatar: { hash: string }
			tmdb: { avatar_path: string | null }
		}
		id: number
		iso_639_1: string
		iso_3166_1: string
		name: string
		include_adult: boolean
		username: string
	}
}

export {}
