import { RootState } from "..";
import { createSelector } from "reselect";

export const fooStore = (store: RootState) => store.foo;

export const getCurrentPost = (store: RootState) => fooStore(store).currentPost;

export const getPosts = (store: RootState) => fooStore(store).posts;

export const getNumber = (store: RootState) => fooStore(store).num;

export const getPostLengthSelector = createSelector(
	getPosts,
	(post) => post.length
);
