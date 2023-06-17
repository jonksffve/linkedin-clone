import Card from './UI/Card';
import classes from './modules/home.module.css';
import { useState } from 'react';
import Modal from './UI/Modal';
import { useSelector } from 'react-redux';
import { createPost } from '../api/FirestoreAPI';
import { getPost } from '../api/FirestoreAPI';

const PostFormComponent = ({ onAddPost }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const [isValid, setIsValid] = useState(false);
	const user = useSelector((state) => state.user);

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = async () => {
		const id = await createPost({ user, content: inputValue });
		const post = await getPost(id);
		onAddPost((prevState) => {
			return [post, ...prevState];
		});
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
