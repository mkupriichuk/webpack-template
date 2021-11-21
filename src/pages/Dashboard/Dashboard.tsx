import { observer } from "mobx-react-lite";
import React from "react";
import { useUserStore } from "../../hooks/useStore";
const Dashboard: React.FC = () => {
	const { name } = useUserStore();

	return <div>{name} Dashboard</div>;
};

export default observer(Dashboard);
