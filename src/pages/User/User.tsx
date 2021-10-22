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
		}
	};
	return (
		<div>
			Enter user name: <br />
			<input type="text" value={inp} onChange={(e) => setInp(e.target.value)} />
			<br />
			<button onClick={changeName}>change name</button>
			Cuttenr user: {user && user}
		</div>
	);
};

export default User;
