import { RootState } from "..";

export const userStore = (store: RootState) => store.user;

export const getUserNameAndEmail = (store: RootState) => {
	const s = userStore(store);
	return {
		name: s.user?.name,
		email: s.user?.email,
		error: s.error
	};
};

export const getIsLoggedIn = (store: RootState) => {
	const s = userStore(store);
	return Boolean(s.user);
};
