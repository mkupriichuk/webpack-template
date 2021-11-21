import PostsStore, { PostsStoreType } from "./postsStore";
import UserStore, { UserStoreType } from "./userStore";
import { createContext } from "react";
import { configure } from "mobx";
export class RootStore {
	postsStore: PostsStoreType;
	userStore: UserStoreType;
	constructor() {
		this.postsStore = new PostsStore(this);
		this.userStore = new UserStore(this);
	}
}

/**
 Warns about any unobserved observable access. Use this if you want to check whether you are using observables without a "MobX context". This is a great way to find any missing observer wrappers, for example in React components. But it will find missing actions as well.
 */
configure({ observableRequiresReaction: true });

export type RootStoreType = RootStore;

export const appStore = new RootStore();

export const RootStoreContext = createContext(appStore);

