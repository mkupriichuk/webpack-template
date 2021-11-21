import { makeAutoObservable, runInAction } from "mobx";
import { RootStoreType } from "./rootStore";
import { IPost } from "../models/posts";
import { Posts } from "../api";

const delay = () => new Promise((res) => setTimeout(res, 500));

export default class PostsStore {
	rootStore: RootStoreType;
	num = 0;
	posts: IPost[] = [];
	constructor(rootStore: RootStoreType) {
		this.rootStore = rootStore;
		makeAutoObservable(this, undefined, { autoBind: true });
	}
	plus() {
		this.num++;
	}
	async loadPosts() {
		try {
			const posts = await Posts.allPosts();
			runInAction(() => {
				this.posts = posts;
			});
		} catch (error) {
			console.log(error);
		}
	}

	get valueFromBar() {
		return this.rootStore.userStore.getName;
	}

	get postsLength() {
		return this.posts.length;
	}
}

export type PostsStoreType = PostsStore;
