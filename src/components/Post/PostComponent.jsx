import classes from '../modules/card.module.css';
import { useSelector } from 'react-redux';
import { getComments, getUserProfile } from '../../api/FirestoreAPI';
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
			/>
			<PostContent
				content={post.content}
				image={post.image}
			/>
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
		</div>
	);
};

export default PostComponent;
