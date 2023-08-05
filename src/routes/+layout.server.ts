export const load = async ({ url, cookies }) => {
	const visited = cookies.get('visited')

	cookies.set('visited', 'true', { path: '/' })

	return {
		url: url.pathname,
		visited
	}
}
