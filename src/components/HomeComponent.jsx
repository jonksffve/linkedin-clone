import classes from './modules/home.module.css';
import PostFormComponent from './PostFormComponent';
import PostListComponent from './PostListComponent';
import { useAuthState } from '../hooks/use-AuthStatus';
import { useEffect, useState } from 'react';
import { getPosts } from '../api/FirestoreAPI';

const HomeComponent = () => {
	useAuthState();
	const [isLoading, setIsLoading] = useState(true);
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const dataPosts = await getPosts();
			setPosts([...dataPosts]);
			setIsLoading(false);
		};

		fetchData();
	}, []);

	return (
		<div className={classes.container}>
			<PostFormComponent onAddPost={setPosts} />
			<PostListComponent
				isLoading={isLoading}
				posts={posts}
			/>
		</div>
	);
};

export default HomeComponent;
