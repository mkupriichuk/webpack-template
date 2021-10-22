import { Home, About, E404, User } from "../pages";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

export interface IRoute {
	name?: string;
	path: string;
	component: React.FunctionComponent;
	exact?: boolean;
}

const routes = [
	{
		name: "home",
		path: "/",
		component: Home,
	},
	{
		name: "about",
		path: "/about",
		component: About,
	},
	{
		name: "user",
		path: "/user",
		component: User,
	},
	{
		path: "**",
		component: E404,
	},
] as const;

type ObtainName<T> = T extends any
	? T extends { name: infer Name }
		? Name
		: never
	: never;

type RoutesMapType = ObtainName<typeof routes[number]>;

const routesMap = routes.reduce((map, route: IRoute) => {
	if (route.name) {
		map[route.name] = route.path.replace(/:.+/, ''); //remove slug for path: product:id -> product
	}
	return map;
}, {} as Record<RoutesMapType, string>);

export { history, routes, routesMap };