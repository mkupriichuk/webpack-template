import React from "react";
import { Title } from "../../components";
import twitter from "icons/twitter.svg";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { incNumber, loadPosts } from "../../store/foo/fooActions";
import { fooStore } from "../../store/foo/selectors";

const Home: React.FC = () => {
	const s = useTypedSelector(fooStore);
	const dispatch = useDispatch();
	const increaseNum = () => {
		dispatch(incNumber());
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
