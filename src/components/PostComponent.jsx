import classes from './modules/card.module.css';
import { Link } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { likePost } from '../api/FirestoreAPI';
import { useMemo, useState } from 'react';
import { getLikes } from '../api/FirestoreAPI';

const PostComponent = ({ post }) => {
	const user = useSelector((state) => state.user);

	const [likeStatus, setLikeStatus] = useState({});

	useMemo(async () => {
		await getLikes(post.id, user.id, setLikeStatus);
	}, [post.id, user.id]);

	const likeHandler = () => {
		likePost(post.id, user.id, likeStatus.isLikedByUser);
	};

	return (
		<div className={classes.posts}>
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
			<p>{likeStatus.likesCount}</p>
			<div className={classes['btn-container']}>
				{likeStatus.isLikedByUser ? (
					<AiFillHeart
						onClick={likeHandler}
						className={`${classes['btn-link']} ${classes['btn-liked']}`}
					/>
				) : (
					<AiOutlineHeart
						onClick={likeHandler}
						className={classes['btn-link']}
					/>
				)}
			</div>
		</div>
	);
};

export default PostComponent;
