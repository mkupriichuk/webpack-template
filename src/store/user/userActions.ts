import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { RootState } from "..";
import { UsersApi } from "../../api";
import { UserActionTypes, getUserAction, errorAction } from "./types";

export const setError = (): errorAction => ({
	type: UserActionTypes.ERROR
});

export const getUser =
	(id: number): ThunkAction<Promise<void>, RootState, unknown, getUserAction> =>
	async (
		dispatch: ThunkDispatch<RootState, unknown, getUserAction | errorAction>
	) => {
		try {
			const user = await UsersApi.getUserById(id);
			dispatch({
				type: UserActionTypes.GET_USER,
				payload: user,
			});
		} catch (error) {
			dispatch(setError());
			console.log(error);
		}
	};

export const clearUser = () => ({
	type: UserActionTypes.CLEAR_USER,
});
