import classes from './modules/home.module.css';
import PostComponent from './PostComponent';
import Card from './UI/Card';

const PostListComponent = ({ posts }) => {
	return (
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
	);
};

export default PostListComponent;
