import React from 'react';
import './styles/app.scss';
import samoyed from 'images/samoyed.jpg';
import Twitter from 'icons/twitter.svg'

const App = () => {
	return (
		<>
			<div className="container">
				<h1>Hello</h1>
				<Twitter />
				<div className="hero">
					<img src={samoyed} alt="" />
				</div>
			</div>
		</>
	);
};

export default App;
