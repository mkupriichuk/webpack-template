import React from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { clearUser, getUser } from "../../store/user/userActions";
import { getIsLoggedIn, getUserNameAndEmail } from "../../store/user/selectors";
import { history, routesMap } from "../../routes";

const Login: React.FC = () => {
	const { name, email, error } = useTypedSelector(getUserNameAndEmail);
	// const isLoggedIn = useTypedSelector(getIsLoggedIn);
	// console.log(isLoggedIn);

	const [inp, setInp] = React.useState("");
	const dispatch = useDispatch();
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		if (/^\d+$/.test(value)) {
			setInp(value);
		}
	};
	const getUserById = () => {
		if (inp.trim() !== "") {
			dispatch(getUser(Number(inp)));
			setInp("");
		}
	};

	const removeUser = () => {
		dispatch(clearUser());
		history.push(routesMap.home);
	};
	const handleEnterClick = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			getUserById();
		}
	};
	return (
		<div>
			Enter user id: <br />
			<input
				type="text"
				value={inp}
				onChange={handleInputChange}
				onKeyPress={handleEnterClick}
			/>
			<br />
			<button onClick={getUserById}>get user</button> <br />
			Current user name: {name} <br />
			Current user email: {email} <br />
			{error && <span>Error. Please enter a number from 1 to 10</span> }
			{name && <button onClick={removeUser}>logout</button>} <br />
		</div>
	);
};

export default Login;
