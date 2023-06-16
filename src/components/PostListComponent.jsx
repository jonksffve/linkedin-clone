import classes from './modules/home.module.css';
import { getPosts } from '../api/FirestoreAPI';
import { Fragment, useEffect, useState } from 'react';
import PostComponent from './PostComponent';
import Spinner from './UI/Spinner';
import Card from './UI/Card';
import { useDispatch, useSelector } from 'react-redux';
import { postsActions } from '../store/posts-slice';

const PostListComponent = () => {
	const [isLoading, setIsLoading] = useState(true);
	const dispatch = useDispatch();
	const posts = useSelector((state) => state.posts);

	useEffect(() => {
		const fetchData = async () => {
			const data = await getPosts();
			dispatch(postsActions.addPosts({ posts: data }));
			setIsLoading(false);
		};

		fetchData();
	}, [dispatch]);

	return (
		<Fragment>
			{isLoading && <Spinner />}
			{!isLoading && (
				<div>
					<h2>List of posts</h2>
					<div className={classes['list-container']}>
						{posts.posts.map((post) => (
							<Card key={post.id}>
								<PostComponent post={post} />
							</Card>
						))}
					</div>
				</div>
			)}
		</Fragment>
	);
};

export default PostListComponent;
