import FooStore, { FooStoreType } from "./fooStore";
import BarStore, { BarStoreType } from "./barStore";
import { createContext, useContext } from "react";
export class RootStore {
	fooStore: FooStoreType;
	barStore: BarStoreType;
	constructor() {
		this.fooStore = new FooStore(this);
		this.barStore = new BarStore(this);
	}
}

// const RootStoreFuncContext = createContext({
// 	todos: todosStoreF()
// });
export type RootStoreType = RootStore;

const RootStoreContext = createContext(new RootStore());

export const useRootStore = () => useContext(RootStoreContext);
export const useFooStore = () => {
	const root = useRootStore();
	return root.fooStore;
};
export const useBarStore = () => {
	const root = useRootStore();
	return root.barStore;
};

// export const RootStoreProvider = ({children}) => {
// 	return <RootStoreContext.Provider value={new RootStore()}>{children}</RootStoreContext.Provider>
// }
