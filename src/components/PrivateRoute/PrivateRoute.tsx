import { observer } from "mobx-react-lite";
import React from "react";
import {
	RouteProps,
	RouteComponentProps,
	Route,
	Redirect,
	useLocation,
} from "react-router-dom";
import { useBarStore } from "../../hooks/useStore";
import { routesMap } from "../../routes";

interface IPrivatRouteProps extends RouteProps {
	component: React.ComponentType<RouteComponentProps<any>>;
}


const PrivateRoute: React.FC<IPrivatRouteProps> = ({
	component: Component,
	...rest
}) => {
	const { isLoggedIn } = useBarStore();
	const location = useLocation();

	return (
		<Route
			{...rest}
			render={(props) =>
				isLoggedIn ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{
							pathname: routesMap.profile,
							state: { from: location.pathname }
						}}
					/>
				)
			}
		/>
	);
};

export default observer(PrivateRoute);
