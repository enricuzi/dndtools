import React, {Component} from "react";
import "./CharacterFeature.css";
import Utils from "../Utils/Utils";

export default class CharacterFeature extends Component {

	constructor(props) {
		super(props);
		this.state = {
			value: ""
		};
		this.onChange = this.onChange.bind(this);
	}

	onChange(e) {
		const {value} = e.target;
		const bonus = Math.floor((value - 10) / 2);
		this.setState({value, bonus});
		this.props.onChange && this.props.onChange({
			id: this.props.id,
			value
		});
	}

	componentDidMount() {
		const value = this.props.value || 10;
		this.setState({value});
	}

	render() {
		const {id, label} = this.props;
		const {value} = this.state;
		const bonus = Utils.getFeatureBonus(value);
		return (
			<label className={`character-feature ${id}`}>
				<label>{id}</label>
				<input type={"number"} min={1} placeholder={label} value={value} onChange={this.onChange}/>
				<span>{bonus}</span>
			</label>
		)
	}
}
