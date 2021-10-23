import React from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { history } from "../../routes";
import { setName } from "../../store/bar/barActions";
import { getName } from "../../store/bar/selectors";

const User: React.FC = () => {
	const user = useTypedSelector(getName);
	const [inp, setInp] = React.useState("");
	const dispatch = useDispatch();
	const changeName = () => {
		if (inp.trim() !== "") {
			dispatch(setName(inp));
			setInp('');
		}
	};
	const handleEnterClick = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			changeName();
		}
	};
	return (
		<div>
			Enter user name: <br />
			<input
				type="text"
				value={inp}
				onChange={(e) => setInp(e.target.value)}
				onKeyPress={handleEnterClick}
			/>
			<br />
			<button onClick={changeName}>change name</button>
			Current user: {user}
		</div>
	);
};

export default User;
