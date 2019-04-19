import React, { useState } from 'react'

// this is hooks

function HooksTest() {
	const [count, setCount] = useState(0)

	return (
			<div className="fl">
				<p> {count} </p>
				<button onClick={() => setCount(count + 1) }>click</button>
			</div>
		)
}

export default HooksTest