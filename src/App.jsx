import { useState } from 'react';
import './App.css';

function App() {
	const [output, setOutput] = useState('');
	const [input, setInput] = useState('');
	const dt = input.trim();

	const isOperator = (symbol) => {
		return /[*/+-]/.test(symbol);
	};

	const clearEverything = () => {
		setInput('0');
		setOutput('');
	};
	const appendOperation = (content) => {
		if (content === 'negative') {
			if (output === '') return;
			setOutput(output.toString().charAt(0) === '-' ? output.slice(1) : '-' + output);
		} else if (content === 'percentage') {
			if (output === '') return;
			setOutput((parseFloat(output) / 100).toString());
		} else if (isOperator(content)) {
			setInput(dt + ' ' + content + ' ');
		} else if (content === '0') {
			if (input.toString().charAt(0) !== '0') {
				setInput(input + content);
			}
		} else if (content === '.') {
			const lastNumber = input.split(/[*/+-]/g).pop();
			if (lastNumber.includes('.')) return;
			setInput(input + content);
		} else {
			if (input.toString().charAt(0) === '0') {
				setInput(input.slice(1) + content);
			} else {
				setInput(input + content);
			}
		}
	};
	const calculateResult = () => {
		if (isOperator(dt.charAt(dt.length - 1))) return;
		const parts = dt.split(' ');
		const newParts = [];
		for (let i = parts.length - 1; i >= 0; i--) {
			if (['*', '/', '+'].includes(parts[i]) && isOperator(parts[i - 1])) {
				newParts.unshift(parts[i]);
				let j = 0;
				let k = i - 1;
				while (isOperator(parts[k])) {
					k--;
					j++;
				}
				i -= j;
			} else {
				newParts.unshift(parts[i]);
			}
		}
		const newDisplay = newParts.join(' ');
		if (isOperator(newDisplay.charAt(0))) {
			setOutput(eval(output + newDisplay));
		} else {
			setOutput(eval(newDisplay));
		}
		setInput('');
	};
	return (
		<div className="container">
			<div id="calculator">
				<div id="display">
					<div id="input">{input}</div>
					<div id="output">{output}</div>
				</div>
				<div className="numpad-container">
					<button onClick={() => clearEverything()} id="clear">
						AC
					</button>
					<button onClick={() => appendOperation('negative')} id="negative">
						&plusmn;
					</button>
					<button onClick={() => appendOperation('percentage')} id="percentage">
						%
					</button>
					<button onClick={() => appendOperation('/')} id="divide">
						&#247;
					</button>
					<button onClick={() => appendOperation('7')} id="seven">
						7
					</button>
					<button onClick={() => appendOperation('8')} id="eight">
						8
					</button>
					<button onClick={() => appendOperation('9')} id="nine">
						9
					</button>
					<button onClick={() => appendOperation('*')} id="multiply">
						&times;
					</button>
					<button onClick={() => appendOperation('4')} id="four">
						4
					</button>
					<button onClick={() => appendOperation('5')} id="five">
						5
					</button>
					<button onClick={() => appendOperation('6')} id="six">
						6
					</button>
					<button onClick={() => appendOperation('-')} id="subtract">
						-
					</button>
					<button onClick={() => appendOperation('1')} id="one">
						1
					</button>
					<button onClick={() => appendOperation('2')} id="two">
						2
					</button>
					<button onClick={() => appendOperation('3')} id="three">
						3
					</button>
					<button onClick={() => appendOperation('+')} id="add">
						+
					</button>
					<button onClick={() => appendOperation('0')} id="zero">
						0
					</button>
					<button onClick={() => appendOperation('.')} id="decimal">
						.
					</button>
					<button onClick={() => calculateResult()} id="equals">
						=
					</button>
				</div>
			</div>
		</div>
	);
}

export default App;
