import { makeAutoObservable } from "mobx";
import { RootStoreType } from "./rootStore";

export default class BarStore {
	rootStore: RootStoreType;
	name = 'maksym';
	constructor(rootStore: RootStoreType) {
		this.rootStore = rootStore;
		makeAutoObservable(this, undefined, { autoBind: true });
	}
	get getName() {
		return this.name;
	}
}

export type BarStoreType = BarStore;
