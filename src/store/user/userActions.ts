import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { RootState } from "..";
import { UsersApi } from "../../api";
import {
	UserActionTypes,
	errorAction,
	UserAction,
} from "./types";

type ThunkActionType = ThunkAction<
	Promise<void>,
	RootState,
	unknown,
	UserAction
>;
type ThunkDispatchType = ThunkDispatch<RootState, unknown, UserAction>;

export const setError = (): errorAction => ({
	type: UserActionTypes.ERROR,
});

export const getUser =
	(id: number): ThunkActionType =>
	async (dispatch: ThunkDispatchType) => {
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
