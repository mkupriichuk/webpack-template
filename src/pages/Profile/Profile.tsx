import { observer } from "mobx-react-lite";
import React from "react";
import { useLocation } from "react-router";
import { useBarStore } from "../../hooks/useStore";

interface ILocationState {
	from: string;
}

const Profile: React.FC = () => {
	const { login, logout, isLoggedIn, name } = useBarStore();
	const location = useLocation<ILocationState>();

	const redirectFrom = location.state?.from;
	const loginHandler = () => login("maksym", redirectFrom);
	const logoutHandler = () => logout();

	return (
		<div>
			Profile
			{!isLoggedIn && <button onClick={loginHandler}>login</button>}
			{isLoggedIn && <button onClick={logoutHandler}>logout</button>}
			{isLoggedIn && name}
		</div>
	);
};

export default observer(Profile);
