export async function detain<
	InitialValue extends unknown,
	ResultValue extends unknown
>(props: {
	/**
	 * Array of data
	 */
	array: InitialValue[]

	/**
	 * Delay in milliseconds
	 */
	delayMs: number

	/**
	 * Each value have to be returned
	 *
	 * in `Promise` or not:
	 * ```ts
	 * Promise<EachReturnType> | EachReturnType
	 * ```
	 */
	each: (
		item: InitialValue,
		index: number
	) => Promise<ResultValue> | ResultValue

	/**
	 * On each resolved value
	 */
	onEach?: (item: ResultValue) => void

	/**
	 * *coming soon*
	 */
	onReject?: (reject: unknown) => void
}) {
	const { delayMs, each, array, onEach, onReject } = props

	let results: ResultValue[] = []

	const delay = (timeoutDelay: number, data?: string) =>
		new Promise((resolve, reject) => {
			if (onReject) onReject(reject)
			setTimeout(resolve.bind(null, data), timeoutDelay)
		})

	let index = 0

	const next = async (): Promise<unknown> => {
		if (index < array.length) {
			const item = array[index]
			const maybePromise = each(item, index) as Promise<ResultValue>

			index++

			let value: ResultValue

			if (maybePromise.then !== undefined) {
				value = (await maybePromise) as ResultValue
			} else {
				value = maybePromise as ResultValue
			}

			results.push(value)

			if (onEach) onEach(value)
			return delay(delayMs).then(next)
		}
	}

	await Promise.resolve(next())
	return results
}
