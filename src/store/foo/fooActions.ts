import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { RootState } from "..";
import { PostsApi } from "../../api";
import { FooActionTypes, incNumberAction, loadPostByIdAction, loadPostsAction } from "./types";

export const incNumber = (): incNumberAction => {
	return { type: FooActionTypes.PLUS_NUMBER };
};

export const loadPosts =
	(): ThunkAction<Promise<void>, RootState, unknown, loadPostsAction> =>
	async (dispatch: ThunkDispatch<RootState, unknown, loadPostsAction>) => {
		try {
			const posts = await PostsApi.allPosts();
			dispatch({
				type: FooActionTypes.LOAD_POSTS,
				payload: posts
			});
		} catch (error) {
			console.log(error);
		}
	};

export const loadPostById =
	(id: number): ThunkAction<Promise<void>, RootState, unknown, loadPostByIdAction> =>
	async (dispatch: ThunkDispatch<RootState, unknown, loadPostByIdAction>) => {
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
