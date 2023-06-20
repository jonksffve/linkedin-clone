import Modal from '../UI/Modal';
import { Progress } from 'antd';
import classes from '../modules/card.module.css';

const UploadImageModal = (props) => {
	return (
		<Modal
			title={props.title}
			open={props.open}
			onOk={props.onOk}
			onCancel={props.onCancel}
			valid={props.valid}
			action={props.action}
		>
			<form
				className={classes.form}
				onSubmit={(event) => {
					event.preventDefault();
				}}
			>
				<input
					type='file'
					onChange={(event) => {
						props.setIsValid({
							...props.valid,
							[props.type]: event.target.value !== '',
						});
						props.setFileInput(event.target.files[0]);
					}}
				/>
				<Progress
					type='circle'
					percent={props.progress}
					size={20}
				/>
			</form>
		</Modal>
	);
};

export default UploadImageModal;
