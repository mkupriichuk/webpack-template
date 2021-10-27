import React from "react";
import { history } from "../../routes";
const About: React.FC = () => {
	return (
		<div>
			about
			<button onClick={() => history.push("/", {from: history.location.pathname})}>
				go to home with history object
			</button>
			<button onClick={() => history.goBack()}>go back</button>

		</div>
	);
};

export default About;
