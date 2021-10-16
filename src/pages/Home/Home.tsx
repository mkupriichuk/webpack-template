import React from "react";
import { Title } from "../../components";
import twitter from "icons/twitter.svg";
const Home: React.FC = () => {
	return (
		<div>
			<Title />
			<div className="hero">
				<img src={twitter} alt="" />
			</div>
		</div>
	);
};

export default Home;
