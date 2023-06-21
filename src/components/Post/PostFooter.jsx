import classes from '../modules/card.module.css';
import { AiFillHeart, AiOutlineHeart, AiOutlineComment } from 'react-icons/ai';
import { BsSend } from 'react-icons/bs';
import { useState } from 'react';
import { createComment, likePost } from '../../api/FirestoreAPI';

const PostFooter = ({ likeStatus, commentStatus, postID, userID }) => {
	const [showCommentBox, setShowCommentBox] = useState(false);
	const [showComments, setShowComments] = useState(false);
	const [comment, setComment] = useState('');

	const likeHandler = () => {
		likePost(postID, userID, likeStatus.isLikedByUser);
	};

	const submitHandler = async () => {
		await createComment(postID, userID, comment.trimEnd());
		setComment('');
	};

	const showCommentHandler = () => {
		setShowCommentBox(true);
	};

	const showCommentsHandler = () => {
		if (commentStatus.comments.length === 0) return;
		setShowComments(!showComments);
	};

	return (
		<div className={classes['btn-container']}>
			<div className={classes['btn-header']}>
				<p className={classes['btn-title']}>
					{likeStatus.likesCount} people like this post
				</p>
				<p
					className={`${classes['btn-title']} ${classes['comment-link']}`}
					onClick={showCommentsHandler}
				>
					{commentStatus.commentCount} people have commented on this
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
									<div className={classes['comment-header']}>
										<h4>{comment.user.name}</h4>
										<p>•</p>
										<small>{comment.timeStamp}</small>
									</div>
									<p className={classes['comment-content']}>
										{comment.comment}
									</p>
								</div>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default PostFooter;
