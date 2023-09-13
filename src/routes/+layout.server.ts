export const load = async ({ url, cookies, locals }) => {
	const visited = cookies.get('visited')

	cookies.set('visited', 'true', { path: '/', maxAge: 60 * 60 * 24 * 7 })

	return {
		user: locals.user,
		url: url.pathname,
		visited
	}
}
