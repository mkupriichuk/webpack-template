import "./styles/app.scss";
import Twitter from "icons/twitter.svg";
import samoyed from "images/samoyed.jpg";
import React from "react";

const App = (): JSX.Element => {
	return (
		<>
			<div className="container">
				<h1>Hello</h1>
				<div className="hero">
					<img src={samoyed} alt="" />
					<Twitter />
				</div>
			</div>
		</>
	);
};

export default App;
