import { createSelector } from "reselect";
import { RootState } from ".";

export const postsStore = (store: RootState) => store.posts;

export const getCurrentPost = (store: RootState) => postsStore(store).currentPost;

export const getPosts = (store: RootState) => postsStore(store).posts;

export const getNumber = (store: RootState) => postsStore(store).num;

export const getPostLengthSelector = createSelector(
	getPosts,
	(post) => post.length
);
