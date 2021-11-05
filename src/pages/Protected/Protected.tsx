import React from "react";
import { useAppSelector } from "../../hooks/reduxHooks";
import { userNameAndEmailSelector } from "../../store/userSelectors";

const Protected: React.FC = () => {
	const {name, email} = useAppSelector(userNameAndEmailSelector);
	return (
		<div>
			Current user name: {name} <br />
			Current user email: {email} <br />
		</div>
	);
};

export default Protected;
