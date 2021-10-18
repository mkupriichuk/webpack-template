import React from "react";
import { RouteComponentProps, useParams } from "react-router-dom";
import { history } from "../../routes";
const About: React.FC = () => {
	// console.log(props);
	const params = useParams();
	console.log(params);

	return (
		<div>
			about
			<button onClick={() => history.push("/")}>
				go to home with history object
			</button>
		</div>
	);
};

export default About;
