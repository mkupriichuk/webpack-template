import { IPost } from "../models/posts";
import { Requests } from "./config";
import axios, { AxiosRequestConfig } from "axios";

const postsInstance = axios.create({
	baseURL: "https://jsonplaceholder.typicode.com",
	withCredentials: true,
});

const postsRequests = new Requests(postsInstance);

class Posts {
	allPosts(options?: AxiosRequestConfig): Promise<IPost[]> {
		return postsRequests.get("/posts", options);
	}
	postById(n: number, options?: AxiosRequestConfig): Promise<IPost> {
		return postsRequests.get(`/posts/${n}`, options);
	}
}

export default new Posts();
