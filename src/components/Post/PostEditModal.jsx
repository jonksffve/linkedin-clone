import classes from '../modules/card.module.css';
import { useState } from 'react';
import Modal from '../UI/Modal';
import { updatePostContent } from '../../api/FirestoreAPI';

const PostEditModal = ({ post, showModal, onShowModal }) => {
	const [editValue, setEditValue] = useState(post.content);
	const [formValid, setFormValid] = useState(true);

	return (
		<Modal
			title={'Update post'}
			open={showModal}
			onCancel={() => {
				onShowModal(false);
			}}
			onOk={() => {
				updatePostContent(post.id, {
					content: editValue.trimEnd(),
				});
				onShowModal(false);
			}}
			valid={formValid}
			action={'Update'}
		>
			<form
				className={classes.form}
				onSubmit={(event) => {
					event.preventDefault();
				}}
			>
				<input
					type='text'
					value={editValue}
					onChange={(event) => {
						setEditValue(event.target.value.trimStart());
						setFormValid(event.target.value.trim().length !== 0);
					}}
				/>
			</form>
		</Modal>
	);
};

export default PostEditModal;
