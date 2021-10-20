import FooStore, { FooStoreType } from "./fooStore";
import BarStore, { BarStoreType } from "./barStore";
import { createContext } from "react";
import { configure } from "mobx";
export class RootStore {
	fooStore: FooStoreType;
	barStore: BarStoreType;
	constructor() {
		this.fooStore = new FooStore(this);
		this.barStore = new BarStore(this);
	}
}

/**
 Warns about any unobserved observable access. Use this if you want to check whether you are using observables without a "MobX context". This is a great way to find any missing observer wrappers, for example in React components. But it will find missing actions as well.
 */
configure({ observableRequiresReaction: true });

export type RootStoreType = RootStore;

export const RootStoreContext = createContext(new RootStore());

// export const RootStoreProvider = ({children}) => {
// 	return <RootStoreContext.Provider value={new RootStore()}>{children}</RootStoreContext.Provider>
// }
