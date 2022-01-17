import React from "react";
import "./styles/app.scss";
import twitter from "icons/twitter.svg?url";

const App: React.FC = ()=> {
	return (
		<>
			<div className="container">
				<h1>Hello</h1>
				<div className="hero">
					<img src={twitter} alt="" />
				</div>
			</div>
		</>
	);
};

export default App;
