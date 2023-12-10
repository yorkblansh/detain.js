import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import './scss/index.scss'
import { detain } from '@detain'

const asyncFunction = <T extends unknown>(data: T): Promise<T> =>
	new Promise((res) => res(data))

const updateData = async () => {
	const array = await detain({
		array: ['1', 2, 8, 155],
		delayMs: 1000,
		each: (item) => {
			console.log({ item })

			return asyncFunction(Number(item))
		},
		onEach: (resolvedValue) => {
			console.log(resolvedValue)
		},
	})

	return array.map((e) => e.toString())
}

const PlayGround = () => {
	const [data, setData] = useState([''])

	useEffect(() => {
		updateData().then(setData)
	}, [])

	return (
		<div className="playground">
			{data.map((e) => (
				<div>{e}</div>
			))}
		</div>
	)
}

ReactDOM.render(<PlayGround />, document.getElementById('root'))
