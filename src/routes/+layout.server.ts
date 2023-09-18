export const load = async ({ url, locals }) => {
	return {
		user: locals.user,
		url: url.pathname,
		meta: { title: 'Untitled' }
	}
}
