export type Image = {
	aspect_ratio: number
	file_path: string
	height: number
	iso_639_1: string
	vote_average: number
	vote_count: number
	width: number
}

export type Videos = {
	id: number
	results: {
		iso_639_1: string
		iso_3166_1: string
		name: string
		key: string
		site: string
		size: number
		type: string
		official: boolean
		published_at: string
		id: string
	}[]
}
