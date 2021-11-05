import React from "react";
import {
	RouteProps,
	RouteComponentProps,
	Route,
	Redirect,
	useLocation,
} from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxHooks";
import { routesMap } from "../../routes";
import { IsLoggedInSelector } from "../../store/userSelectors";

interface IPrivatRouteProps extends RouteProps {
	component: React.ComponentType<RouteComponentProps<any>>;
}


const PrivateRoute: React.FC<IPrivatRouteProps> = ({
	component: Component,
	...rest
}) => {
	const isLoggedIn = useAppSelector(IsLoggedInSelector);
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
							pathname: routesMap.login,
							state: { from: location.pathname }
						}}
					/>
				)
			}
		/>
	);
};

export default PrivateRoute;
