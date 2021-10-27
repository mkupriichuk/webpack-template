import { observer } from "mobx-react-lite";
import React from "react";
import { useBarStore } from "../../hooks/useStore";
const Dashboard: React.FC = () => {
	const { name } = useBarStore();

	return <div>{name} Dashboard</div>;
};

export default observer(Dashboard);
