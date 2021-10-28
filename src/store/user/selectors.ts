import { RootState } from "..";
import { createSelector } from "reselect";

const selectUser = (store: RootState) => store.user.user;
const selectError = (store: RootState) => store.user.error;

export const userNameAndEmailSelector = createSelector(
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
