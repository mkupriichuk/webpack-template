import React from "react";
import { Title } from "../../components";
import twitter from "icons/twitter.svg";
import { observer } from "mobx-react-lite";
import { useFooStore } from "../../hooks/useStore";
const Home: React.FC = () => {
	const {loadPosts, num, posts, postsLength} = useFooStore();
	return (
		<div>
			<Title />
			<div className="hero">
				<img src={twitter} alt="" />
			</div>
			{num}
			<button onClick={() => loadPosts()}>load posts</button>
			posts {postsLength}:
			{
				posts && posts.map(post => <li key={post.id}>{post.body}</li>)
			}
		</div>
	);
};

export default observer(Home);
