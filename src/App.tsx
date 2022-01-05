import React from "react";
import "./styles/app.scss";
import { Router, Switch, Route, Link } from "react-router-dom";
import { history, routesMap, routes, IRoute } from "./routes";
import { PrivateRoute } from "./components";
import { AppLayout } from "./layout";

const App: React.FC = () => {
	return (
		<Router history={history}>
			<AppLayout>
				<ul>
					<li>
						<Link to={routesMap.home}>home</Link>
					</li>
				</ul>
				<Switch>
					{routes.map((route: IRoute) => {
						return route.auth ? (
							<PrivateRoute
								path={route.path}
								component={route.component}
								exact={route.exact ?? true}
								key={route.path}
							/>
						) : (
							<Route
								path={route.path}
								component={route.component}
								exact={route.exact ?? true}
								key={route.path}
							/>
						);
					})}
				</Switch>
			</AppLayout>
		</Router>
	);
};

export default App;
