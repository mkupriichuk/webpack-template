import { createSelector } from "reselect";
import { RootState } from "..";


const selectUser = (store: RootState) => store.users.user;
const selectError = (store: RootState) => store.users.error;

export const userDtoSelector = createSelector(
	selectUser,
	selectError,
	(user, error) => ({
		name: user?.name,
		email: user?.email,
		error,
	})
);

export const IsLoggedInSelector = createSelector(selectUser, (user) =>
	Boolean(user)
);
