import './app.css';
import twitter from 'icons/twitter.svg';
import samoyed from 'images/samoyed.jpg';
import React from 'react';

const App = ():JSX.Element => {
	return (
		<>
			<div className="container">
				<h1>Hello</h1>
				<div className="hero">
					<img src={twitter} alt="twitter logo" />
					<img src={samoyed} alt="" />
				</div>
			</div>
		</>
	);
};

export default App;
