import { RootState } from "..";

export const userStore = (store: RootState) => store.user;

export const getUserNameAndEmail = (store: RootState) => {
	const user = userStore(store);
	return {
		name: user?.name,
		email: user?.email,
	};
};

export const getIsLoggedIn = (store: RootState) => {
	const user = userStore(store);
	return Boolean(user);
};
