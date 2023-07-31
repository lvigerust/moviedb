export interface Credits {
	cast: Cast[]
	crew: Crew[]
	id: number
}

enum Gender {
	'Not set / not specified',
	'Female',
	'Male',
	'Non-binary'
}

interface Person {
	adult: boolean
	gender: Gender
	id: number
	known_for_department: string
	name: string
	original_name: string
	popularity: number
	profile_path: string
	credit_id: string
}

interface Cast extends Person {
	cast_id: number
	character: string
	order: number
}

interface Crew extends Person {
	department: string
	job: string
}
