import { IPost } from "../models/posts";
import { requests } from "./config";

const Posts = {
  allPosts: (): Promise<IPost[]> => requests.get('/posts'),
  postById: (n: number): Promise<IPost> => requests.get(`/posts/${n}`)
};

export default Posts;
