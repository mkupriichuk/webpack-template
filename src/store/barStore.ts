import { makeAutoObservable } from "mobx";
import { history, routesMap } from "../routes";
import { RootStoreType } from "./rootStore";

export default class BarStore {
	rootStore: RootStoreType;
	name: null | string = null;
	constructor(rootStore: RootStoreType) {
		this.rootStore = rootStore;
		makeAutoObservable(this, undefined, { autoBind: true });
	}
	login(name: string, redirectTo: string | undefined = routesMap.home) {
		this.name = name;
		history.push(redirectTo);
	}
	logout() {
		this.name = null;
		history.push(routesMap.home);
	}
	get getName() {
		return this.name;
	}
	get isLoggedIn() {
		return Boolean(this.name);
	}
}

export type BarStoreType = BarStore;
