import Card from './UI/Card';
import classes from './modules/home.module.css';
import { useState } from 'react';
import Modal from './UI/Modal';
import { createPost } from '../api/FirestoreAPI';

import { useSelector } from 'react-redux';

const PostFormComponent = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const [isValid, setIsValid] = useState(false);
	const user = useSelector((state) => state.user);

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = async () => {
		createPost({ user, content: inputValue });
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
