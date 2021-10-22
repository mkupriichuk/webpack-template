import React from "react";
import { useDispatch } from "react-redux";
import { RouteComponentProps, useParams } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { history } from "../../routes";
import { loadPostById } from "../../store/foo/fooActions";
import { getCurrentPost } from "../../store/foo/selectors";
const About: React.FC = () => {
	// console.log(props);
	const params = useParams();
	const currentPost = useTypedSelector(getCurrentPost);
	console.log(currentPost);
	const dispatch = useDispatch();
	const getPostById = () => {
		dispatch(loadPostById(2));
	};
	return (
		<div>
			about
			<button onClick={() => history.push("/")}>
				go to home with history object
			</button>
			<button onClick={getPostById}>get post with id 2</button>
			{currentPost && currentPost.body}
		</div>
	);
};

export default About;
