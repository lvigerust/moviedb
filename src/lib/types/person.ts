import type { Movie } from './movie'
import type { Show } from './show'

enum Gender {
	'Not set / not specified',
	'Female',
	'Male',
	'Non-binary'
}

export interface CombinedCredits {
	cast: (Movie | Show)[]
	crew: (Movie | Show)[]
	id: number
}

export interface PersonDetails {
	biography: string
	adult: false
	also_known_as: string[]
	birthday: string
	deathday: string | null
	gender: Gender
	homepage: string | null
	id: number
	imdb_id: number
	known_for_department: string
	media_type: string
	name: string
	place_of_birth: string
	popularity: number
	profile_path: string
}
