import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { RootState } from "..";
import Users from "../../api/users";
import { UserActionTypes, getUserAction } from "./types";

export const getUser =
	(id: number): ThunkAction<Promise<void>, RootState, unknown, getUserAction> =>
	async (dispatch: ThunkDispatch<RootState, unknown, getUserAction>) => {
		try {
			const user = await Users.getUserById(id);
			dispatch({
				type: UserActionTypes.GET_USER,
				payload: user,
			});
		} catch (error) {
			console.log(error);
		}
	};

export const clearUser = () => ({
	type: UserActionTypes.CLEAR_USER
});
