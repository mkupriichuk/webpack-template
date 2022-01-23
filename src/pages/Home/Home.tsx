import React from "react";
import { Title } from "../../components";
import { observer } from "mobx-react-lite";
const Home: React.FC = () => {
	return (
		<div>
			<Title tag="h1">Hello</Title>
		</div>
	);
};

export default observer(Home);
