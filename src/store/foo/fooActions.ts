import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { RootState } from "..";
import { PostsApi } from "../../api";
import {
	FooAction,
	FooActionTypes,
	incNumberAction,
	loadPostByIdAction,
} from "./types";

type ThunkActionType = ThunkAction<
	Promise<void>,
	RootState,
	unknown,
	FooAction
>;
type ThunkDispatchType = ThunkDispatch<RootState, unknown, FooAction>;

export const incNumber = (): incNumberAction => {
	return { type: FooActionTypes.PLUS_NUMBER };
};

export const loadPosts =
	(): ThunkActionType => async (dispatch: ThunkDispatchType) => {
		try {
			const posts = await PostsApi.allPosts();
			dispatch({
				type: FooActionTypes.LOAD_POSTS,
				payload: posts,
			});
		} catch (error) {
			console.log(error);
		}
	};

export const loadPostById =
	(
		id: number
	): ThunkActionType =>
	async (dispatch: ThunkDispatchType) => {
		try {
			const post = await PostsApi.postById(id);
			dispatch({
				type: FooActionTypes.CURRENT_POST,
				payload: post,
			});
		} catch (error) {
			console.log(error);
		}
	};
