import {useContext} from 'react';
import { RootStoreContext } from '../store/rootStore';

export const useRootStore = () => useContext(RootStoreContext);

export const useFooStore = () => {
	const root = useRootStore();
	return root.fooStore;
};

export const useBarStore = () => {
	const root = useRootStore();
	return root.barStore;
};
