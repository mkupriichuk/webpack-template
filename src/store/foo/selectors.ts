import { RootState } from "..";

export const fooStore = (store: RootState) => store.foo;

export const getCurrentPost = (store: RootState) => fooStore(store).currentPost;

export const getPosts= (store: RootState) => fooStore(store).posts;

export const getNumber = (store: RootState) => fooStore(store).num;
