import type { Credit, CreditMedia, Credits } from '$types'

type Job =
	| 'Executive Producer'
	| 'Producer'
	| 'Costume Design'
	| 'Director'
	| 'Screenplay'
	| 'Editor'
	| 'Creator'
	| 'Writer'

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

export function findPersonByJob(credits: Credits, job: Job): Credit | undefined {
	return credits.crew.find((person: Credit) => person.job === job)
}

export function removeDuplicatesByProperty<T extends CreditMedia>(
	creditArray: T[],
	propertyKey: keyof T
): T[] {
	const uniqueMap = new Map() // or use: const uniqueMap: { [key: string]: boolean } = {};

	return creditArray.reduce((uniqueArray: T[], item: T) => {
		const propertyValue = item[propertyKey]
		if (!uniqueMap.has(propertyValue)) {
			uniqueMap.set(propertyValue, true)
			uniqueArray.push(item)
		}
		return uniqueArray
	}, [])
}

export function calculatePercentage(newNumber: number, originalNumber: number) {
	const increase = newNumber - originalNumber
	const percentageIncrease = (increase / originalNumber) * 100

	if (percentageIncrease <= 0) {
		const decrease = originalNumber - newNumber
		return (decrease / originalNumber) * 100
	} else return percentageIncrease
}

export function dynamicSort(property: string) {
	let sortOrder = 1

	if (property[0] === '-') {
		sortOrder = -1
		property = property.substring(1)
	}

	return function (a: any, b: any) {
		const result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0
		return result * sortOrder
	}
}

export function slugify(title: string): string {
	return title
		.toLowerCase() // Convert the title to lowercase
		.replace(/ /g, '-') // Replace spaces with hyphens
		.replace(/[^\w-]+/g, '') // Remove non-alphanumeric characters except hyphens
		.replace(/--+/g, '-') // Replace consecutive hyphens with a single hyphen
		.replace(/^-+|-+$/g, '') // Remove leading and trailing hyphens
}
