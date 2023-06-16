import classes from './modules/card.module.css';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

const PostComponent = ({ post }) => {
	return (
		<Fragment>
			<div className={classes.header}>
				<Link to={`/account/${post.user.id}`}>
					<img
						className={`${classes['profile-img']} ${classes.small}`}
						src={post.user.photo}
						alt=''
					/>
				</Link>
				<div className={classes.subheader}>
					<Link to={`/account/${post.user.id}`}>
						<h3>{post.user.name}</h3>
					</Link>
					<small>
						{post.user.headline ? post.user.headline : ''}
					</small>
				</div>
			</div>
			<small>{post.timeStamp}</small>
			<p>{post.content}</p>
		</Fragment>
	);
};

export default PostComponent;
