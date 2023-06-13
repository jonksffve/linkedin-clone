import { Fragment } from 'react';
import classes from './modules/card.module.css';

const PostComponent = ({ post }) => {
	return (
		<Fragment>
			<div className={classes['card-header']}>
				<img
					className={classes['profile-img']}
					src={post.user.photo}
					alt=''
				/>
				<div className={classes['card-subheader']}>
					<h3>{post.user.name}</h3>
					<small>Description</small>
				</div>
			</div>
			<small>{post.timeStamp}</small>
			<p>{post.content}</p>
		</Fragment>
	);
};

export default PostComponent;
