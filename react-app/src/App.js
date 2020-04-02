import React, {Component} from 'react';
import './App.css';
import Logger from "./components/Services/Logger";
import Home from "./components/Home/Home";

export default class App extends Component {

	constructor(props) {
		super(props);
		this.logger = new Logger("App");
	}

	render() {
		return (
			<div className="App">
				<Home/>
			</div>
		);
	}
}
