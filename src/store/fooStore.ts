import { makeAutoObservable } from "mobx";
import { RootStoreType } from "./rootStore";
import agent from "../api/agent";
import { ITodo } from "../models/posts";

export default class FooStore {
	rootStore: RootStoreType;
	num = 0;
	posts: ITodo[] = [];
	currentPost: ITodo|null = null;
	constructor(rootStore: RootStoreType) {
		this.rootStore = rootStore;
		makeAutoObservable(this);
	}
	plus(): void {
		this.num++;
	}
	loadPosts = async () => {
		try {
			const posts = await agent.Todos.allPosts();
			this.posts = posts;
		} catch (error) {
			console.log(error);
		}
	}
	getPostById = async (id:number) => {
		try {
			const post = await agent.Todos.postById(id);
			this.currentPost = post;
		} catch (error) {
			console.log(error);
		}
	}

	get valueFromBar() {
		return this.rootStore.barStore.getName;
	}

	get postsLength() {
		return this.posts.length;
	}
}

// const todosContext = createContext({
// 	todos: new TodoStore()
// })
export type FooStoreType = FooStore;
