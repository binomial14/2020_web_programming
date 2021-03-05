import React from 'react';

import CalcButton from '../components/CalcButton';

// 計算機 App
class CalcApp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			display: 0,
			temp: 'None',
			operationState: 'None',
			operationButtonPressed: false,
		};
	}


	resetState() {
		this.setState(() => ({display: 0}));
		this.setState(() => ({temp: 'None'}));
		this.setState(() => ({operationState: 'None'}));
		this.setState(() => ({operationButtonPressed: false}));
	}

	showNotImplemented() {
		console.warn('This function is not implemented yet.');
	}

	handleNumberClick(num) {
		if ( this.state.operationButtonPressed === false ) {
			this.setState(state => ({display: state.display*10 + num}));
		} else {
			this.setState(state => ({temp: state.display}));
			this.setState({display: num});
			this.setState({operationButtonPressed: false});
		}
	}

	compute() {
		console.log(this.state.temp, this.state.display);
		switch(this.state.operationState) {
			case '+':
				this.setState(state => ({display: state.temp + state.display}));
				break;
			case '-':
				this.setState(state => ({display: state.temp - state.display}));
				break;
			case '*':
				this.setState(state => ({display: state.temp * state.display}));
				break;
			case '/':
				this.setState(state => ({display: state.temp / state.display}));
				break;
			default:
				console.log('type error');
		}
	}

	handleOperationClick(type) {
		if ( type === '+' ) {
			this.setState({operationState: '+'});
		} else if ( type === '-' ) {
			this.setState({operationState: '-'});
		} else if ( type === '*' ) {
			this.setState({operationState: '*'});
		} else if ( type === '/' ) {
			this.setState({operationState: '/'});
		}
		if ( this.state.temp !== 'None' ) {
			this.compute();
			if ( type !== '=' ) {
				this.setState({temp: this.state.display});
			} else {
				this.setState({temp: 'None'});
			}
		}
		this.setState({operationButtonPressed: true});
	}

	render() {
		return (
			<div className="calc-app">
				<div className="calc-container">
					<div className="calc-output">
						<div className="calc-display">{this.state.display}</div>
					</div>
					<div className="calc-row">
						<CalcButton onClick={() => this.resetState()}>AC</CalcButton>
						<CalcButton onClick={this.showNotImplemented}>+/-</CalcButton>
						<CalcButton onClick={this.showNotImplemented}>%</CalcButton>
						<CalcButton className="calc-operator" onClick={() => this.handleOperationClick('/')}>÷</CalcButton>
					</div>
					<div className="calc-row">
						<CalcButton className="calc-number" onClick={() => this.handleNumberClick(7)}>7</CalcButton>
						<CalcButton className="calc-number" onClick={() => this.handleNumberClick(8)}>8</CalcButton>
						<CalcButton className="calc-number" onClick={() => this.handleNumberClick(9)}>9</CalcButton>
						<CalcButton className="calc-operator" onClick={() => this.handleOperationClick('*')}>x</CalcButton>
					</div>
					<div className="calc-row">
						<CalcButton className="calc-number" onClick={() => this.handleNumberClick(6)}>6</CalcButton>
						<CalcButton className="calc-number" onClick={() => this.handleNumberClick(5)}>5</CalcButton>
						<CalcButton className="calc-number" onClick={() => this.handleNumberClick(4)}>4</CalcButton>
						<CalcButton className="calc-operator" onClick={() => this.handleOperationClick('-')}>-</CalcButton>
					</div>
					<div className="calc-row">
						<CalcButton className="calc-number" onClick={() => this.handleNumberClick(3)}>3</CalcButton>
						<CalcButton className="calc-number" onClick={() => this.handleNumberClick(2)}>2</CalcButton>
						<CalcButton className="calc-number" onClick={() => this.handleNumberClick(1)}>1</CalcButton>
						<CalcButton className="calc-operator" onClick={() => this.handleOperationClick('+')}>+</CalcButton>
					</div>
					<div className="calc-row">
						<CalcButton className="bigger-btn" onClick={() => this.handleNumberClick(0)}>0</CalcButton>
						<CalcButton className="calc-number" onClick={this.showNotImplemented}>.</CalcButton>
						<CalcButton className="calc-operator" onClick={() => this.handleOperationClick('=')}>=</CalcButton>
					</div>
				</div>
			</div>
		);
	}
}

export default CalcApp;
