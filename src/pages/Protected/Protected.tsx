import React from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { getUserNameAndEmail } from "../../store/user/selectors";

const Protected: React.FC = () => {
	const { name, email } = useTypedSelector(getUserNameAndEmail);
	return (
		<div>
			Current user name: {name} <br />
			Current user email: {email} <br />
		</div>
	);
};

export default Protected;
