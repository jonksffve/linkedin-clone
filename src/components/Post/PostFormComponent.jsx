import classes from '../modules/home.module.css';
import { useState } from 'react';
import Modal from '../UI/Modal';
import Card from '../UI/Card';
import { useSelector } from 'react-redux';
import { createPost } from '../../api/FirestoreAPI';

const PostFormComponent = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const [isValid, setIsValid] = useState(false);
	const user = useSelector((state) => state.user);

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = async () => {
		await createPost({ userID: user.id, content: inputValue.trimEnd() });
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
				title='Create a post'
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				valid={isValid}
				action='Post'
				mask={true}
			>
				<form autoComplete='off'>
					<input
						className={classes['form-input']}
						type='text'
						name='content'
						id='content'
						placeholder='What do you want to talk about?'
						value={inputValue}
						onChange={(event) => {
							setIsValid(event.target.value.trim().length !== 0);
							setInputValue(event.target.value.trimStart());
						}}
					/>
				</form>
			</Modal>
		</Card>
	);
};

export default PostFormComponent;
