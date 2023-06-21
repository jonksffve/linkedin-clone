import classes from '../modules/card.module.css';
import { useSelector } from 'react-redux';
import { getComments, getUserProfile } from '../../api/FirestoreAPI';
import { useMemo, useState } from 'react';
import { getLikes } from '../../api/FirestoreAPI';
import PostHeader from './PostHeader';
import PostContent from './PostContent';
import PostFooter from './PostFooter';
import PostEditModal from './PostEditModal';
import PostConfirmDelete from './PostConfirmDelete';

const PostComponent = ({ post }) => {
	const user = useSelector((state) => state.user);
	const [likeStatus, setLikeStatus] = useState({ likes: [], likesCount: 0 });
	const [commentStatus, setCommentStatus] = useState({
		comments: [],
		commentCount: 0,
	});
	const [postUser, setPostUser] = useState({});
	const [showModal, setShowModal] = useState(false);
	const [showConfirmation, setShowConfirmation] = useState(false);

	useMemo(async () => {
		await getUserProfile(post.userID, setPostUser);
		await getLikes(post.id, user.id, setLikeStatus);
		await getComments(post.id, setCommentStatus);
	}, [post.id, user.id, post.userID]);

	return (
		<div className={classes.posts}>
			<PostHeader
				post={post}
				postUser={postUser}
				onShowModal={setShowModal}
				onShowPopup={setShowConfirmation}
			/>
			<PostContent content={post.content} />
			<PostFooter
				likeStatus={likeStatus}
				commentStatus={commentStatus}
				postID={post.id}
				userID={user.id}
			/>
			<PostEditModal
				post={post}
				showModal={showModal}
				onShowModal={setShowModal}
			/>
			<PostConfirmDelete
				showPopup={showConfirmation}
				onShowPopup={setShowConfirmation}
				postID={post.id}
			/>
		</div>
	);
};

export default PostComponent;
