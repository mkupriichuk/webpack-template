import './app.css';
import React from 'react';
import twitter from 'icons/twitter.svg';

const App: React.FC = () => {
	return (
		<>
			<div className="container">
				<div className="hero">
					<img src={twitter} alt="twitter" />
				</div>
			</div>
		</>
	);
};

export default App;
