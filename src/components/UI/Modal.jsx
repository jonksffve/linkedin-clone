import { Modal, Button } from 'antd';
import classes from '../modules/modal.module.css';

const CustomModal = ({
	open,
	onOk,
	onCancel,
	valid,
	onTyping,
	onSetValue,
	value,
}) => {
	return (
		<Modal
			title='Create a post'
			open={open}
			onCancel={onCancel}
			footer={[
				<Button
					key='submit'
					type='primary'
					onClick={onOk}
					disabled={!valid}
				>
					Post
				</Button>,
			]}
		>
			<form autoComplete='off'>
				<input
					className={classes['form-input']}
					type='text'
					name='content'
					id='content'
					placeholder='What do you want to talk about?'
					value={value}
					onChange={(event) => {
						onTyping(event.target.value);
						onSetValue(event.target.value);
					}}
				/>
			</form>
		</Modal>
	);
};

export default CustomModal;
