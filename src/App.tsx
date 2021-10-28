import React from "react";
import "./styles/app.scss";
import { Router, Switch, Route, Link } from "react-router-dom";
import { history, routesMap, routes, IRoute } from "./routes";
import { PrivateRoute } from "./components";

const App: React.FC = () => {
	return (
		<Router history={history}>
			<ul>
				<li>
					<Link to={routesMap.home}>home</Link>
				</li>
				<li>
					<Link to={routesMap.about}>about</Link>
				</li>
				<li>
					<Link to={routesMap.login}>login page</Link>
				</li>
				<li>
					<Link to={routesMap.protected}>protected page</Link>
				</li>
			</ul>
			<div className="container">
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
			</div>
		</Router>
	);
};

export default App;
