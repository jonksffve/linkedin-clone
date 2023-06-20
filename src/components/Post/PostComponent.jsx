import classes from '../modules/card.module.css';
import { Link } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart, AiOutlineComment } from 'react-icons/ai';
import { BsSend } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import {
	createComment,
	getComments,
	likePost,
	getUserProfile,
} from '../../api/FirestoreAPI';
import { useMemo, useState } from 'react';
import { getLikes } from '../../api/FirestoreAPI';

const PostComponent = ({ post }) => {
	const user = useSelector((state) => state.user);
	const [likeStatus, setLikeStatus] = useState({ likes: [], likesCount: 0 });
	const [commentStatus, setCommentStatus] = useState({
		comments: [],
		commentCount: 0,
	});
	const [showCommentBox, setShowCommentBox] = useState(false);
	const [showComments, setShowComments] = useState(false);
	const [comment, setComment] = useState('');
	const [postUser, setPostUser] = useState({});

	useMemo(async () => {
		await getUserProfile(post.userID, setPostUser);
		await getLikes(post.id, user.id, setLikeStatus);
		await getComments(post.id, setCommentStatus);
	}, [post.id, user.id, post.userID]);

	const likeHandler = () => {
		likePost(post.id, user.id, likeStatus.isLikedByUser);
	};

	const showCommentHandler = () => {
		setShowCommentBox(true);
	};

	const submitHandler = async () => {
		await createComment(post.id, user, comment.trimEnd());
		setComment('');
	};

	const showCommentsHandler = () => {
		if (commentStatus.comments.length === 0) return;
		setShowComments(!showComments);
	};

	return (
		<div className={classes.posts}>
			<div className={classes.header}>
				<Link to={`/account/${post.userID}`}>
					<img
						className={`${classes['profile-img']} ${classes.small}`}
						src={postUser.photo}
						alt=''
					/>
				</Link>
				<div className={classes.subheader}>
					<Link to={`/account/${post.userID}`}>
						<h3>{postUser.name}</h3>
					</Link>
					<small>{postUser.headline ? postUser.headline : ''}</small>
					<small>{post.timeStamp}</small>
				</div>
			</div>
			<div className={classes['comment-content']}>
				<p>{post.content}</p>
			</div>
			<div className={classes['btn-container']}>
				<div className={classes['btn-header']}>
					<p className={classes['btn-title']}>
						{likeStatus.likesCount} people like this post
					</p>
					<p
						className={`${classes['btn-title']} ${classes['comment-link']}`}
						onClick={showCommentsHandler}
					>
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
							autoComplete='off'
							className={classes['comment-input']}
							type='text'
							name='comment'
							id='comment'
							value={comment}
							placeholder='Add a comment...'
							onChange={(event) => {
								setComment(event.target.value.trimStart());
							}}
						/>
						<BsSend
							className={classes['send-icon']}
							onClick={submitHandler}
						/>
					</div>
				)}
				{showComments && (
					<div className={classes['comments-container']}>
						{commentStatus.comments.map((comment) => {
							return (
								<div
									key={comment.id}
									className={classes['comment-item']}
								>
									<img
										className={`${classes['profile-img']} ${classes.small}`}
										src={comment.user.photo}
										alt=''
									/>
									<div className={classes['comment-body']}>
										<div
											className={
												classes['comment-header']
											}
										>
											<h4>{comment.user.name}</h4>
											<p>•</p>
											<small>{comment.timeStamp}</small>
										</div>
										<p
											className={
												classes['comment-content']
											}
										>
											{comment.comment}
										</p>
									</div>
								</div>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
};

export default PostComponent;
