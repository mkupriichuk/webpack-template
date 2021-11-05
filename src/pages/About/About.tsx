import React from "react";
import { RouteComponentProps, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { history } from "../../routes";
import { getCurrentPost } from "../../store/postsSelectors";
import { loadPostById } from "../../store/postsSlice";
const About: React.FC = () => {
	// console.log(props);
	const params = useParams();
	const currentPost = useAppSelector(getCurrentPost);
	console.log(currentPost);
	const dispatch = useAppDispatch();
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
