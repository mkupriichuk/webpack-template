import React from "react";
import { useParams } from "react-router-dom";
import { Posts } from "../../api";
import { IPost } from "../../models/posts";
const Post: React.FC = () => {
	const [loading, setLoading] = React.useState(false);
	const [post, setPost] = React.useState<IPost>();
	const { id } = useParams<any>();
	React.useEffect(() => {
		setLoading(true);
		Posts.postById(id)
			.then((res) => setPost(res))
			.finally(() => setLoading(false));
	}, [id]);
	return <>
	<div>{loading && 'loading...'}</div>
	<div>{post && post.body}</div>
	</>;
};

export default Post;
