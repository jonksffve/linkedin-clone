import classes from './modules/home.module.css';
import PostFormComponent from './PostFormComponent';
import PostListComponent from './PostListComponent';
import { useAuthState } from '../hooks/use-AuthStatus';
import { useMemo, useState } from 'react';
import { getPosts } from '../api/FirestoreAPI';

const HomeComponent = () => {
	useAuthState();
	const [isLoading, setIsLoading] = useState(true);
	const [posts, setPosts] = useState([]);

	useMemo(async () => {
		await getPosts(setPosts);
		setIsLoading(false);
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
