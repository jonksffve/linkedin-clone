import classes from '../modules/home.module.css';
import { useState } from 'react';
import Modal from '../UI/Modal';
import Card from '../UI/Card';
import { useSelector } from 'react-redux';
import { createPost } from '../../api/FirestoreAPI';
import { uploadPostImage } from '../../api/StorageAPI';
import FormComponent from './FormComponent';

const PostFormComponent = () => {
	const user = useSelector((state) => state.user);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isValid, setIsValid] = useState(false);
	const [uploadProgress, setUploadProgress] = useState(0);
	const [postContent, setPostContent] = useState('');
	const [postImageURL, setPostImageURL] = useState('');

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = async () => {
		if (postContent.trim() === '' && postImageURL.name === '') return;

		const postID = await createPost({
			userID: user.id,
			content: postContent.trimEnd(),
			setPostContent,
		});

		uploadPostImage(
			postID,
			postImageURL,
			setUploadProgress,
			setPostImageURL,
			setIsValid,
			setIsModalOpen
		);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	return (
		<Card>
			<div className={classes.wrapper}>
				<img
					className={classes['profile-img']}
					src={user.photo}
					alt=''
				/>
				<button
					type='button'
					onClick={showModal}
				>
					<span>Create post</span>
				</button>
			</div>
			<Modal
				title='Create a post'
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				valid={isValid}
				action='Post'
			>
				<FormComponent
					uploadProgress={uploadProgress}
					postContent={postContent}
					setIsValid={setIsValid}
					setPostContent={setPostContent}
					setPostImageURL={setPostImageURL}
				/>
			</Modal>
		</Card>
	);
};

export default PostFormComponent;
