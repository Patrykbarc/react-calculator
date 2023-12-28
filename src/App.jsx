import { useState } from 'react'

function App() {
	const [display, setDisplay] = useState('')

	function handleSetDisplay(e) {
		const isNumberOrOperator = /^[0-9.+\-*/=]$/.test(e)

		try {
			switch (e) {
				case 'C':
					setDisplay('')
					break
				case '=':
					setDisplay(eval(display))
					break

				default:
					if (isNumberOrOperator) {
						setDisplay(prev => {
							const updatedDisplay = prev + e
							const sanitizedDisplay = updatedDisplay
								.replace(/-+/g, '-')
								.replace(/\.{2,}/g, '.')
								.replace(/\*{2,}/g, '*')
								.replace(/\/{2,}/g, '/')
								.replace(/\+{2,}/g, '+')
							return sanitizedDisplay
						})
					} else {
						setDisplay('error')
					}
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
				{[7, 8, 9, '+', 4, 5, 6, '-', 1, 2, 3, '*', '.', 0, '=', '/'].map(
					value => (
						<button
							key={value}
							value={value}
							onClick={() => handleSetDisplay(value)}>
							{value}
						</button>
					)
				)}
				{/* <button
					disabled={display.length === 0}
					onClick={() => handleSetDisplay('=')}>
					=
				</button> */}
				<button onClick={() => handleSetDisplay('C')}>C</button>
			</div>
		</div>
	)
}

export default App
