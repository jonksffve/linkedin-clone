import classes from './modules/home.module.css';
import { getPosts, getLikes } from '../api/FirestoreAPI';
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
	const user = useSelector((state) => state.user);

	useEffect(() => {
		const fetchData = async () => {
			const dataPosts = await getPosts();
			const newArray = await Promise.all(
				dataPosts.map(async (post) => {
					const likes = await getLikes(post.id, user.id);
					return {
						...post,
						...likes,
					};
				})
			);
			dispatch(postsActions.addPosts({ posts: newArray }));
			setIsLoading(false);
		};

		fetchData();
	}, [dispatch, user.id]);

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
