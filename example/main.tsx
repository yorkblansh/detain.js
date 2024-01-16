import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import './scss/index.scss'
import { detain } from '@detain'

const asyncFunction = <T extends unknown>(data: T, index: number): Promise<T> =>
	new Promise((res) =>
		setTimeout(() => {
			res(data)
		}, index)
	)

const updateData = async () => {
	const array = await detain({
		array: [1, 2, 3, 4].map(asyncFunction),
		delayMs: 1000,
		each: (item, index) => {
			return item
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
