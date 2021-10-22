import { BarAction, BarActionEnum, IBarState } from './types';

const initialState: IBarState = {
	name: 'maksym'
};

export function barReducer(state = initialState, action: BarAction): IBarState {
	switch (action.type) {
		case BarActionEnum.SET_NAME:
			return { ...state, name: action.payload};
		default:
			return state;
	}
}
