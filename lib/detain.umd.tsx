export const detain = async <
	LIST extends unknown[],
	R extends unknown,
	RTYPE extends Promise<R> | R
>(props: {
	array: LIST
	delayMs: number
	each: (item: LIST[0], index: number) => RTYPE
	onEach?: (r: Awaited<RTYPE>) => void
	onReject?: (reject: unknown) => void
}) => {
	const { delayMs, each, array, onEach, onReject } = props

	let results: Awaited<RTYPE>[] = []

	const delay = (timeoutDelay: number, data?: string) =>
		new Promise((resolve, reject) => {
			if (onReject) onReject(reject)
			setTimeout(resolve.bind(null, data), timeoutDelay)
		})

	let index = 0
	const next = async (): Promise<unknown> => {
		if (index < array.length) {
			const maybePromise = each(array[index++], index) as Promise<R>

			let value: Awaited<RTYPE>

			if (maybePromise['then'] !== undefined) {
				value = (await maybePromise) as Awaited<RTYPE>
			} else {
				value = maybePromise as Awaited<RTYPE>
			}

			results.push(value)

			if (onEach) onEach(value)
			return delay(delayMs).then(() => {
				return next()
			})
		}
	}

	await Promise.resolve(next())
	return results
}
