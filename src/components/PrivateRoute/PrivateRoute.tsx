import { observer } from "mobx-react-lite";
import React from "react";
import {
	RouteProps,
	RouteComponentProps,
	Route,
	Redirect,
	useLocation,
} from "react-router-dom";
import { useUserStore } from "../../hooks/useStore";
import { routesMap } from "../../routes";

interface IPrivatRouteProps extends RouteProps {
	component: React.ComponentType<RouteComponentProps<any>>;
}


const PrivateRoute: React.FC<IPrivatRouteProps> = ({
	component: Component,
	...rest
}) => {
	const { isLoggedIn } = useUserStore();
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
							pathname: routesMap.home,
							state: { from: location.pathname }
						}}
					/>
				)
			}
		/>
	);
};

export default observer(PrivateRoute);
