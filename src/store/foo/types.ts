import { IPost } from "../../models/posts";

export interface IFooState {
	num: number;
	posts: IPost[];
	currentPost: IPost | null;
}

export enum FooActionEnum {
	PLUS_NUMBER = "PLUS_NUMBER",
	LOAD_POSTS = "LOAD_POSTS",
	CURRENT_POST = "CURRENT_POST",
}

export interface incNumberAction {
	type: FooActionEnum.PLUS_NUMBER;
}
export interface loadPostsAction {
	type: FooActionEnum.LOAD_POSTS;
	payload: IPost[];
}
export interface loadPostByIdAction {
	type: FooActionEnum.CURRENT_POST;
	payload: IPost;
}

export type FooAction = incNumberAction | loadPostsAction | loadPostByIdAction;
