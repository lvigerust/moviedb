export function slugify(title: string): string {
	return title
		.toLowerCase() // Convert the title to lowercase
		.replace(/ /g, '-') // Replace spaces with hyphens
		.replace(/[^\w-]+/g, '') // Remove non-alphanumeric characters except hyphens
		.replace(/--+/g, '-') // Replace consecutive hyphens with a single hyphen
		.replace(/^-+|-+$/g, '') // Remove leading and trailing hyphens
}
