import React from "react";
import "./styles/app.scss";
import twitter from "icons/twitter.svg";
import { observer } from "mobx-react-lite";
import { useFooStore, useRootStore, useBarStore } from "./store/rootStore";
import { Title } from "./components";

const App: React.FC = () => {
	const rootStore = useRootStore(); //rootStore
	const fooStore = useFooStore();
	const barStore = useBarStore();
	console.log('rootStore:', rootStore);
	console.log('fooStore:', fooStore);
	console.log('barStore:', barStore);

	return (
		<>
			<div className="container">
				<Title />
				<div className="hero">
					<img src={twitter} alt="" />
				</div>
			</div>
		</>
	);
};

export default observer(App);
