import { StrictMode, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import './scss/index.scss'
import { detain } from '@detain.js'

const asyncFunction = <T extends unknown>(data: T): Promise<T> =>
	new Promise((res) => res(data))

const updateData = async () => {
	const array = await detain({
		array: ['3', '2', 1].map((el) => el),
		delayMs: 500,
		each: (item) => asyncFunction(Number(item)),
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
