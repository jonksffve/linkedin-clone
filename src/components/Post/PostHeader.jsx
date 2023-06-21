import classes from '../modules/card.module.css';
import { Link } from 'react-router-dom';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import PostConfirmDelete from './PostConfirmDelete';
import { useState } from 'react';

const PostHeader = ({ post, postUser, onShowModal }) => {
	const [showConfirmation, setShowConfirmation] = useState(false);

	return (
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
			<div className={classes['update-btns']}>
				<AiOutlineEdit
					size={24}
					onClick={() => {
						onShowModal(true);
					}}
				/>
				<AiOutlineDelete
					size={24}
					onClick={() => {
						setShowConfirmation(true);
					}}
				/>
				<PostConfirmDelete
					showPopup={showConfirmation}
					onShowPopup={setShowConfirmation}
					postID={post.id}
				/>
			</div>
		</div>
	);
};

export default PostHeader;
