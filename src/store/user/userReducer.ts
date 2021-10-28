import { UserAction, UserActionTypes, IUserState } from './types';

const initialState: IUserState | null = null;

export function userReducer(state = initialState, action: UserAction): IUserState | null {
	switch (action.type) {
		case UserActionTypes.GET_USER:
			return {...action.payload};
		case UserActionTypes.CLEAR_USER:
			return null;
		default:
			return state;
	}
}
