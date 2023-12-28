import { useState } from 'react'

function App() {
	const [display, setDisplay] = useState('')

	function handleSetDisplay(e) {
		const isNumberOrOperator = /^[0-9.+\-*/=]$/.test(e)

		display === 'error' && setDisplay('')

		try {
			if (e === 'C') {
				setDisplay('')
			} else if (e === '=') {
				evaluateExpression()
			} else if (isNumberOrOperator) {
				updateDisplay(e)
			} else {
				setDisplay('error')
			}
		} catch (error) {
			setDisplay('error')
		}
	}

	function evaluateExpression() {
		setDisplay(prev => {
			try {
				const result = new Function('return ' + prev)()
				return result.toString()
			} catch (error) {
				setDisplay('error')
				return prev
			}
		})
	}

	function updateDisplay(value) {
		setDisplay(prev => {
			const updatedDisplay = prev + value
			const sanitizedDisplay = updatedDisplay
				.replace(/-+/g, '-')
				.replace(/\.{2,}/g, '.')
				.replace(/\*{2,}/g, '*')
				.replace(/\/{2,}/g, '/')
				.replace(/\+{2,}/g, '+')

			const parsedDisplay = parseFloat(sanitizedDisplay)

			if (!isNaN(parsedDisplay)) {
				return sanitizedDisplay
			} else {
				setDisplay('error')
				return prev
			}
		})
	}

	return (
		<div className='calculator'>
			<div className='display'>{display}</div>
			<div className='buttons'>
				{[7, 8, 9, '+', 4, 5, 6, '-', 1, 2, 3, '*', '.', 0, '=', '/'].map(
					value => (
						<button
							className='button'
							key={value}
							value={value}
							onClick={() => handleSetDisplay(value)}>
							{value}
						</button>
					)
				)}
				<button
					className='button clear-btn'
					onClick={() => handleSetDisplay('C')}>
					C
				</button>
			</div>
		</div>
	)
}

export default App
