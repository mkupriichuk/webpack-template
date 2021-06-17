import React from 'react'
import './app.css';
import Twitter from 'icons/twitter.svg';
import samoyed from 'images/samoyed.jpg';

const App = () => {
	return (
		<>
			<div className="container">
				<h1>Hello</h1>
				<div className="hero">
					<Twitter />
					<img src={samoyed} alt="" />
				</div>
			</div>
		</>
	);
};

export default App;
