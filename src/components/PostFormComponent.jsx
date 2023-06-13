import Card from './UI/Card';
import classes from './modules/home.module.css';
import { useState } from 'react';
import Modal from './UI/Modal';
import { createPost } from '../api/FirestoreAPI';
import { useDispatch, useSelector } from 'react-redux';
import { postsActions } from '../store/posts-slice';

const PostFormComponent = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const [isValid, setIsValid] = useState(false);
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = async () => {
		const post = { user, content: inputValue };
		await createPost(post);
		dispatch(postsActions.addNewPost({ post }));
		setInputValue('');
		setIsModalOpen(false);
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
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				value={inputValue}
				onSetValue={setInputValue}
				onTyping={setIsValid}
				valid={isValid}
			/>
		</Card>
	);
};

export default PostFormComponent;
