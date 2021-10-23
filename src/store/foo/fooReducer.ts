import { FooAction, FooActionTypes } from './types';
import { IFooState } from "./types";

const initialState: IFooState = {
	num: 0,
	posts: [],
	currentPost: null,
};

export function fooReducer(state = initialState, action: FooAction): IFooState {
	switch (action.type) {
		case FooActionTypes.PLUS_NUMBER:
			return { ...state, num: state.num + 1 };
		case FooActionTypes.LOAD_POSTS:
			return { ...state, posts: action.payload };
		case FooActionTypes.CURRENT_POST:
			return { ...state, currentPost: action.payload };
		default:
			return state;
	}
}
