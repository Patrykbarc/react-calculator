import { useState } from 'react'
import { Buttons } from '../components/Buttons'

function App() {
	const [display, setDisplay] = useState('')

	return (
		<div className='calculator'>
			<div className='display'>{display}</div>
			<Buttons display={display} setDisplay={setDisplay} />
		</div>
	)
}

export default App
