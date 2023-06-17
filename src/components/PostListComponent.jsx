import classes from './modules/home.module.css';
import { Fragment } from 'react';
import PostComponent from './PostComponent';
import Spinner from './UI/Spinner';
import Card from './UI/Card';

const PostListComponent = ({ isLoading, posts }) => {
	return (
		<Fragment>
			{isLoading && <Spinner />}
			{!isLoading && (
				<div>
					<h2>List of posts</h2>
					<div className={classes['list-container']}>
						{posts.map((post) => (
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
