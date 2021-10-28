import { observer } from "mobx-react-lite";
import React from "react";
import { useLocation } from "react-router";
import { useBarStore } from "../../hooks/useStore";


const Profile: React.FC = () => {
	const { login, logout, isLoggedIn, name } = useBarStore();
	const location = useLocation<any>();

	const loginHandler = () => login("maksym", location.state?.from);
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
