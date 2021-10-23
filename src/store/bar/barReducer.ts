import { BarAction, BarActionTypes, IBarState } from './types';

const initialState: IBarState = {
	name: 'maksym'
};

export function barReducer(state = initialState, action: BarAction): IBarState {
	switch (action.type) {
		case BarActionTypes.SET_NAME:
			return { ...state, name: action.payload};
		default:
			return state;
	}
}
