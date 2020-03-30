import React, {Component} from "react";
import "./DiceRoller.css";

export default class DiceRoller extends Component {

	constructor(props) {
		super(props);
		this.state = {
			value: 20,
			number: 1,
			bonus: 0,
			roll: null
		};
		this.values = [4, 6, 8, 10, 12, 20, 100];
		this.onChangeDiceValue = this.onChangeDiceValue.bind(this);
		this.onChangeDiceNumber = this.onChangeDiceNumber.bind(this);
		this.onChangeDiceBonus = this.onChangeDiceBonus.bind(this);
		this.roll = this.roll.bind(this);
	}

	onChangeDiceValue(e) {
		const {value} = e.target;
		this.setState({value: Number(value)})
	}

	onChangeDiceNumber(e) {
		const {value} = e.target;
		this.setState({number: Number(value)})
	}

	onChangeDiceBonus(e) {
		const {value} = e.target;
		this.setState({bonus: Number(value)})
	}

	roll() {
		const {value, number, bonus} = this.state;
		let roll = 0;
		for (let i = 0; i < number; i++) {
			roll += Math.floor(Math.random() * value) + 1;
		}
		roll += bonus;
		this.setState({roll});
		this.props.onRoll && this.props.onRoll({value, number, bonus, roll})
	}

	render() {
		const {value, number, bonus, roll} = this.state;
		return (
			<div className={"dice-roller"}>
				<div className={"inputs"}>
					<label>
						<span>Number</span>
						<input type={"number"} min={1} value={number} onChange={this.onChangeDiceNumber}/>
					</label>
					<label>
						<span>Type</span>
						<select onChange={this.onChangeDiceValue}>
							{this.values.map((item, index) => <option key={index} value={item} selected={item === value}>{item}</option>)}
						</select>
					</label>
					<label>
						<span>Bonus</span>
						<input type={"number"} min={0} value={bonus} onChange={this.onChangeDiceBonus}/>
					</label>
				</div>
				<div className={"button"}>
					<button className={"save"} onClick={this.roll}>Roll</button>
				</div>
				<div className={"roll"}>{roll}</div>
			</div>
		)
	}
}
