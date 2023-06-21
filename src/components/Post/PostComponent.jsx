import classes from '../modules/card.module.css';
import { useSelector } from 'react-redux';
import {
	createComment,
	getComments,
	likePost,
	getUserProfile,
} from '../../api/FirestoreAPI';
import { useMemo, useState } from 'react';
import { getLikes } from '../../api/FirestoreAPI';
import PostHeader from './PostHeader';
import PostContent from './PostContent';
import PostFooter from './PostFooter';
import PostEditModal from './PostEditModal';

const PostComponent = ({ post }) => {
	const user = useSelector((state) => state.user);
	const [likeStatus, setLikeStatus] = useState({ likes: [], likesCount: 0 });
	const [commentStatus, setCommentStatus] = useState({
		comments: [],
		commentCount: 0,
	});
	const [postUser, setPostUser] = useState({});
	const [showModal, setShowModal] = useState(false);
	const [editValue, setEditValue] = useState(post.content);
	const [formValid, setFormValid] = useState(true);

	useMemo(async () => {
		await getUserProfile(post.userID, setPostUser);
		await getLikes(post.id, user.id, setLikeStatus);
		await getComments(post.id, setCommentStatus);
	}, [post.id, user.id, post.userID]);

	const likeHandler = () => {
		likePost(post.id, user.id, likeStatus.isLikedByUser);
	};

	const submitHandler = async (comment, setComment) => {
		console.log(comment);
		await createComment(post.id, user, comment.trimEnd());
		setComment('');
	};

	return (
		<div className={classes.posts}>
			<PostHeader
				post={post}
				postUser={postUser}
			/>
			<PostContent content={post.content} />
			<PostFooter
				likeStatus={likeStatus}
				commentStatus={commentStatus}
				onLike={likeHandler}
				onCreateComment={submitHandler}
			/>
			{/* <PostEditModal /> */}
		</div>
	);
};

export default PostComponent;
