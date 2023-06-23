import classes from '../modules/home.module.css';
import { useEffect, useState } from 'react';
import Modal from '../UI/Modal';
import Card from '../UI/Card';
import { useSelector } from 'react-redux';
import { createPost, updatePostContent } from '../../api/FirestoreAPI';
import { AiOutlinePicture } from 'react-icons/ai';
import { uploadPostImage } from '../../api/StorageAPI';
import { Progress } from 'antd';

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
				<form autoComplete='off'>
					<input
						className={classes['form-input']}
						type='text'
						name='content'
						id='content'
						placeholder='What do you want to talk about?'
						value={postContent}
						onChange={(event) => {
							setIsValid(event.target.value.trim().length !== 0);
							setPostContent(event.target.value.trimStart());
						}}
					/>
					<div className={classes['form-icons']}>
						<div className={classes['form-icon']}>
							<label htmlFor='image'>
								<AiOutlinePicture size={24} />
							</label>
							{uploadProgress !== 0 && (
								<Progress
									type='circle'
									percent={uploadProgress}
									size={30}
									showInfo={false}
								/>
							)}
							<input
								onChange={(event) => {
									setIsValid(
										event.target.files[0].name !== ''
									);
									setPostImageURL(event.target.files[0]);
								}}
								type='file'
								name='image'
								id='image'
								hidden
							/>
						</div>
					</div>
				</form>
			</Modal>
		</Card>
	);
};

export default PostFormComponent;
