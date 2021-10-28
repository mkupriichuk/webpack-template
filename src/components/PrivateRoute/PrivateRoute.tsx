import React from "react";
import {
	RouteProps,
	RouteComponentProps,
	Route,
	Redirect,
	useLocation,
} from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { routesMap } from "../../routes";
import { getIsLoggedIn } from "../../store/user/selectors";

interface IPrivatRouteProps extends RouteProps {
	component: React.ComponentType<RouteComponentProps<any>>;
}


const PrivateRoute: React.FC<IPrivatRouteProps> = ({
	component: Component,
	...rest
}) => {
	const isLoggedIn= useTypedSelector(getIsLoggedIn);
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
