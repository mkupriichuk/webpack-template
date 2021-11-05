import React from "react";
import { Title } from "../../components";
import twitter from "icons/twitter.svg";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { inc, loadPosts } from "../../store/postsSlice";
import { postsStore } from "../../store/postsSelectors";

const Home: React.FC = () => {
	const s = useAppSelector(postsStore);
	const dispatch = useAppDispatch();
	const increaseNum = () => {
		dispatch(inc());
	};
	const getPosts = () => {
		dispatch(loadPosts());
	};
	return (
		<div>
			<Title />
			<div className="hero">
				<img src={twitter} alt="" />
			</div>
			<button onClick={increaseNum}>inc num</button>
			{s.num}
			<button onClick={getPosts}>load posts</button>
			posts:
			{s.posts && s.posts.map((post) => <li key={post.id}>{post.body}</li>)}
		</div>
	);
};

export default Home;
