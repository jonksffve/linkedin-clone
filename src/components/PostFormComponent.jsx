import Card from './UI/Card';
import userImg from '../assets/icons/user.png';
import classes from './modules/home.module.css';
import { useState } from 'react';
import Modal from './UI/Modal';
import { createPost } from '../api/FirestoreAPI';

const PostFormComponent = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const [isValid, setIsValid] = useState(false);

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = async () => {
		createPost(inputValue);
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
					src={userImg}
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
