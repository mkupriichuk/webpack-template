import {useContext} from 'react';
import { RootStoreContext } from '../store/rootStore';

export const useRootStore = () => useContext(RootStoreContext);

export const useUserStore = () => {
	const root = useRootStore();
	return root.userStore;
};

export const usePostsStore = () => {
	const root = useRootStore();
	return root.postsStore;
};
