import classes from './modules/card.module.css';
import { Link } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart, AiOutlineComment } from 'react-icons/ai';
import { BsSend } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { createComment, getComments, likePost } from '../api/FirestoreAPI';
import { useMemo, useState } from 'react';
import { getLikes } from '../api/FirestoreAPI';

const PostComponent = ({ post }) => {
	const user = useSelector((state) => state.user);
	const [likeStatus, setLikeStatus] = useState({ likes: [], likesCount: 0 });
	const [commentStatus, setCommentStatus] = useState({
		comments: [],
		commentCount: 0,
	});
	const [showCommentBox, setShowCommentBox] = useState(false);
	const [comment, setComment] = useState('');

	useMemo(async () => {
		await getLikes(post.id, user.id, setLikeStatus);
		await getComments(post.id, setCommentStatus);
	}, [post.id, user.id]);

	const likeHandler = () => {
		likePost(post.id, user.id, likeStatus.isLikedByUser);
	};

	const showCommentHandler = () => {
		setShowCommentBox(true);
	};

	const submitHandler = async () => {
		await createComment(post.id, user.id, comment);
		setComment('');
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
			<div className={classes['btn-container']}>
				<div className={classes['btn-header']}>
					<p className={classes['btn-title']}>
						{likeStatus.likesCount} people like this post
					</p>
					<p className={classes['btn-title']}>
						{commentStatus.commentCount} people have commented on
						this
					</p>
				</div>
				<div>
					<hr />
				</div>
				<div className={classes['btn-footer']}>
					<div
						className={classes['btn-item']}
						onClick={likeHandler}
					>
						{likeStatus.isLikedByUser ? (
							<AiFillHeart
								className={`${classes['btn-link']} ${classes['btn-liked']}`}
							/>
						) : (
							<AiOutlineHeart className={classes['btn-link']} />
						)}
						<p
							className={`${
								likeStatus.isLikedByUser
									? classes.blue
									: classes.black
							}
							`}
						>
							Like
						</p>
					</div>
					<div
						className={classes['btn-item']}
						onClick={showCommentHandler}
					>
						<AiOutlineComment
							className={`${
								showCommentBox
									? `${classes['btn-link']} ${classes['btn-liked']}`
									: classes['btn-link']
							}`}
						/>
						<p
							className={`${
								showCommentBox ? classes.blue : classes.black
							}
							`}
						>
							Comment
						</p>
					</div>
				</div>
				{showCommentBox && (
					<div className={classes['comment-container']}>
						<input
							className={classes['comment-input']}
							type='text'
							name='comment'
							id='comment'
							value={comment}
							placeholder='Add a comment...'
							onChange={(event) => {
								setComment(event.target.value);
							}}
						/>
						<BsSend
							className={classes['send-icon']}
							onClick={submitHandler}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default PostComponent;
