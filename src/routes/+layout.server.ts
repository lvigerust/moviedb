export const load = async ({ url, cookies }) => {
	const visited = cookies.get('visited')

	cookies.set('visited', 'true', { path: '/', maxAge: 60 * 60 * 24 * 7 })

	return {
		url: url.pathname,
		visited
	}
}
