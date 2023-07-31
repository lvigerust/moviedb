import type { Credits } from '$types'

export function formatDate(
	date: string,
	dateStyle: Intl.DateTimeFormatOptions['dateStyle'] = 'long',
	locales = 'en'
) {
	const formatter = new Intl.DateTimeFormat(locales, { dateStyle })
	return formatter.format(new Date(date))
}

export function formatRuntime(runtime: number) {
	if (!runtime || runtime < 0) {
		throw new Error('Input must be a non-negative number.')
	}

	const hours = Math.floor(runtime / 60)
	const remainingMinutes = runtime % 60

	return `${hours}h ${remainingMinutes}m`
}

export function formatNumber(
	number: number,
	notation: Intl.NumberFormatOptions['notation'] = 'compact',
	style: Intl.NumberFormatOptions['style'] = 'currency',
	currency: Intl.NumberFormatOptions['currency'] = 'USD'
) {
	return new Intl.NumberFormat('en', {
		notation,
		style,
		currency
	}).format(number)
}

export function findPersonByJob(credits: Credits, job: string) {
	return credits.crew.find((person) => person.job === job)
}
