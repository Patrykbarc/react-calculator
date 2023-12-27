import { useState } from 'react'

function App() {
	const [display, setDisplay] = useState('')
	console.log(display)

	function handleSetDisplay(e) {
		console.log(e)

		try {
			switch (e) {
				case 'C':
					setDisplay('')
					break
				case '=':
					setDisplay(eval(display).toFixed(5))
					break

				default:
					setDisplay(prevState => prevState + e)
					break
			}
		} catch (error) {
			setDisplay('error')
		}
	}

	return (
		<div className='calculator'>
			<div className='display'>{display}</div>
			<div className='buttons'>
				{[7, 8, 9, '+', 4, 5, 6, '-', 1, 2, 3, '*', '.', 0, 'C', '/'].map(
					value => (
						<button
							key={value}
							value={value}
							onClick={() => handleSetDisplay(value)}>
							{value}
						</button>
					)
				)}
				<button
					disabled={display.length === 0}
					onClick={() => handleSetDisplay('=')}>
					=
				</button>
			</div>
		</div>
	)
}

export default App
