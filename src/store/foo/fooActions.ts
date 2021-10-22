import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { RootState } from "..";
import { Posts } from "../../api";
import { FooActionEnum, incNumberAction, loadPostByIdAction, loadPostsAction } from "./types";

export const incNumber = (): incNumberAction => {
	return { type: FooActionEnum.PLUS_NUMBER };
};

export const loadPosts =
	(): ThunkAction<Promise<void>, RootState, unknown, loadPostsAction> =>
	async (dispatch: ThunkDispatch<RootState, unknown, loadPostsAction>) => {
		try {
			const posts = await Posts.allPosts();
			dispatch({
				type: FooActionEnum.LOAD_POSTS,
				payload: posts
			});
		} catch (error) {
			console.log(error);
		}
	};

export const loadPostById =
	(id: number): ThunkAction<Promise<void>, RootState, unknown, AnyAction> =>
	async (dispatch: ThunkDispatch<RootState, unknown, loadPostByIdAction>) => {
		try {
			const post = await Posts.postById(id);
			dispatch({
				type: FooActionEnum.CURRENT_POST,
				payload: post,
			});
		} catch (error) {
			console.log(error);
		}
	};
