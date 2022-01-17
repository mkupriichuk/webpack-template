import React from 'react'
import './app.css';
import twitter from 'icons/twitter.svg?url';

const App = () => {
	return (
		<>
			<div className="container">
				<h1>Hello</h1>
				<div className="hero">
					<img src={twitter} alt="twitter" />
				</div>
			</div>
		</>
	);
};

export default App;
