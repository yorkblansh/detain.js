export const detain = async <T extends unknown, R extends unknown>(props: {
	array: T[]
	delayMs: number
	each: (item: T, index: number) => Promise<R> | R
	onEach?: (item: R) => void
	onReject?: (reject: unknown) => void
}) => {
	const { delayMs, each, array, onEach, onReject } = props

	let results: R[] = []

	const delay = (timeoutDelay: number, data?: string) =>
		new Promise((resolve, reject) => {
			if (onReject) onReject(reject)
			setTimeout(resolve.bind(null, data), timeoutDelay)
		})

	let index = 0

	const next = async (): Promise<unknown> => {
		if (index < array.length) {
			index++

			const item = array[index]
			const maybePromise = each(item, index) as Promise<R>

			let value: R

			if (maybePromise.then !== undefined) {
				value = (await maybePromise) as R
			} else {
				value = maybePromise as R
			}

			results.push(value)

			if (onEach) onEach(value)
			return delay(delayMs).then(next)
		}
	}

	await Promise.resolve(next())
	return results
}
