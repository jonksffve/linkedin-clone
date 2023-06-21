import classes from './modules/home.module.css';
import PostFormComponent from './Post/PostFormComponent';
import PostListComponent from './Post/PostListComponent';
import { useMemo, useState } from 'react';
import { getPosts } from '../api/FirestoreAPI';

const HomeComponent = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [posts, setPosts] = useState([]);

	useMemo(async () => {
		await getPosts(setPosts, setIsLoading);
	}, []);

	return (
		<div className={classes.container}>
			<PostFormComponent />
			<PostListComponent
				isLoading={isLoading}
				posts={posts}
			/>
		</div>
	);
};

export default HomeComponent;
