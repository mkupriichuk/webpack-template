import { Home, E404} from "../pages";
import { createBrowserHistory } from "history";
const history = createBrowserHistory();

export interface IRoute {
	name?: string;
	path: string;
	component: React.FunctionComponent;
	exact?: boolean;
	auth?: boolean;
}

const routes = [
	{
		name: "home",
		path: "/",
		component: Home,
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
