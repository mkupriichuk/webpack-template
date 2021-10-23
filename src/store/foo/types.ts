import { IPost } from "../../models/posts";

export interface IFooState {
	num: number;
	posts: IPost[];
	currentPost: IPost | null;
}

export enum FooActionTypes {
	PLUS_NUMBER = "PLUS_NUMBER",
	LOAD_POSTS = "LOAD_POSTS",
	CURRENT_POST = "CURRENT_POST",
}

export interface incNumberAction {
	type: FooActionTypes.PLUS_NUMBER;
}
export interface loadPostsAction {
	type: FooActionTypes.LOAD_POSTS;
	payload: IPost[];
}
export interface loadPostByIdAction {
	type: FooActionTypes.CURRENT_POST;
	payload: IPost;
}

export type FooAction = incNumberAction | loadPostsAction | loadPostByIdAction;
