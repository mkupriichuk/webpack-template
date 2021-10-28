import { UserAction, UserActionTypes, IUserState } from "./types";

interface IState {
	user: IUserState | null;
	error: null | number;
}

const initialState: IState = {
	user: null,
	error: null,
};

export function userReducer(state = initialState, action: UserAction): IState {
	switch (action.type) {
		case UserActionTypes.GET_USER:
			return { ...state, user: action.payload, error: null };
		case UserActionTypes.CLEAR_USER:
			return { ...state, user: null, error: null };
		case UserActionTypes.ERROR:
			return { ...state, user: null, error: 404 };
		default:
			return state;
	}
}
