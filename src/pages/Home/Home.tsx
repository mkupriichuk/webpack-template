import React from "react";
import { Title } from "../../components";
import twitter from "icons/twitter.svg";
import { observer } from "mobx-react-lite";
import { usePostsStore } from "../../hooks/useStore";
import { Link } from "react-router-dom";
import { routesMap } from "../../routes";
const Home: React.FC = () => {
	const { loadPosts, num, posts, postsLength, plus } = usePostsStore();
	React.useEffect(() => {
		loadPosts();
	}, [loadPosts]);
	return (
		<div>
			<Title />
			<div className="hero">
				<img src={twitter} alt="" />
			</div>
			<button onClick={() => plus()}>inc num</button>
			{num}
			{/* <button onClick={() => loadPosts()}>load posts</button> */}
			posts {postsLength}:
			{posts && posts.map((post) => <li key={post.id}>
				<Link to={routesMap.post + post.id}>go to post</Link>
				{post.body}
				</li>)}
		</div>
	);
};

export default observer(Home);
