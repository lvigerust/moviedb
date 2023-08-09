import type { CombinedCredits, Credit } from '$types'

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

export function findPersonByJob(combinedCredits: CombinedCredits, job: string) {
	return combinedCredits.crew.find((person: Credit) => person.job === job)
}

export function removeDuplicatesByProperty<T extends Credit>(
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
