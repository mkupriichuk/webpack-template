import FooStore, { FooStoreType } from "./fooStore";
import BarStore, { BarStoreType } from "./barStore";
import { createContext } from "react";
export class RootStore {
	fooStore: FooStoreType;
	barStore: BarStoreType;
	constructor() {
		this.fooStore = new FooStore(this);
		this.barStore = new BarStore(this);
	}
}

export type RootStoreType = RootStore;

export const RootStoreContext = createContext(new RootStore());

// export const RootStoreProvider = ({children}) => {
// 	return <RootStoreContext.Provider value={new RootStore()}>{children}</RootStoreContext.Provider>
// }
