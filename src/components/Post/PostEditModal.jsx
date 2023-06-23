import { useState } from 'react';
import Modal from '../UI/Modal';
import { uploadPostImage } from '../../api/StorageAPI';
import FormComponent from './FormComponent';
import { updatePostContent } from '../../api/FirestoreAPI';

const PostEditModal = ({ post, showModal, onShowModal }) => {
	const [editValue, setEditValue] = useState(post.content);
	const [formValid, setFormValid] = useState(true);
	const [uploadProgress, setUploadProgress] = useState(0);
	const [postImageURL, setPostImageURL] = useState('');

	const resetState = () => {
		onShowModal(false);
		setEditValue(post.content);
		setFormValid(true);
		uploadProgress(0);
		postImageURL('');
	};

	return (
		<Modal
			title={'Update post'}
			open={showModal}
			onCancel={() => {
				resetState();
			}}
			onOk={async () => {
				if (editValue.trim() === '' && postImageURL.name === '') return;

				await updatePostContent(post.id, {
					content: editValue.trimEnd(),
				});

				uploadPostImage(
					post.id,
					postImageURL,
					setUploadProgress,
					setPostImageURL,
					setFormValid,
					onShowModal
				);
			}}
			valid={formValid}
			action={'Update'}
		>
			<FormComponent
				uploadProgress={uploadProgress}
				postContent={editValue}
				setIsValid={setFormValid}
				setPostContent={setEditValue}
				setPostImageURL={setPostImageURL}
			/>
		</Modal>
	);
};

export default PostEditModal;
