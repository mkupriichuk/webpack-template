import { makeAutoObservable } from "mobx";
import { RootStoreType } from "./rootStore";
import { IPost } from "../models/posts";
import { Posts } from "../api";

export default class FooStore {
	rootStore: RootStoreType;
	num = 0;
	posts: IPost[] = [];
	currentPost: IPost | null = null;
	constructor(rootStore: RootStoreType) {
		this.rootStore = rootStore;
		makeAutoObservable(this);
	}
	plus(): void {
		this.num++;
	}
	loadPosts = async () => {
		try {
			const posts = await Posts.allPosts();
			this.posts = posts;
		} catch (error) {
			console.log(error);
		}
	};
	getPostById = async (id: number) => {
		try {
			const post = await Posts.postById(id);
			this.currentPost = post;
		} catch (error) {
			console.log(error);
		}
	};

	get valueFromBar() {
		return this.rootStore.barStore.getName;
	}

	get postsLength() {
		return this.posts.length;
	}
}

export type FooStoreType = FooStore;
