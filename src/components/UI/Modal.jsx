import { Modal, Button } from 'antd';

const CustomModal = (props) => {
	return (
		<Modal
			title={props.title}
			open={props.open}
			onCancel={props.onCancel}
			mask={props.mask}
			footer={[
				<Button
					key='submit'
					type='primary'
					onClick={props.onOk}
					disabled={!props.valid}
				>
					{props.action}
				</Button>,
			]}
		>
			{props.children}
		</Modal>
	);
};

export default CustomModal;
