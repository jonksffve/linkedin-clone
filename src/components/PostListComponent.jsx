import classes from './modules/home.module.css';
import { getPosts } from '../api/FirestoreAPI';
import { Fragment, useEffect, useState } from 'react';
import PostComponent from './PostComponent';
import Spinner from './UI/Spinner';
import Card from './UI/Card';

const PostListComponent = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const data = await getPosts();
			setPosts(data);
			setIsLoading(false);
		};

		fetchData();
	}, []);

	return (
		<Fragment>
			{isLoading && <Spinner />}

			{!isLoading && (
				<div>
					<h2>List of posts</h2>
					<div className={classes['list-container']}>
						{posts.map((post) => (
							<Card
								key={post.id}
								customClass={classes['list-item']}
							>
								<PostComponent content={post.content} />
							</Card>
						))}
					</div>
				</div>
			)}
		</Fragment>
	);
};

export default PostListComponent;
