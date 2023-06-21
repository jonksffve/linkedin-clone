import { Popconfirm } from 'antd';
import { useState } from 'react';

import { deletePost } from '../../api/FirestoreAPI';

const PostConfirmDelete = ({ showPopup, onShowPopup, postID }) => {
	const [confirmLoading, setConfirmLoading] = useState(false);

	const handleOk = async () => {
		setConfirmLoading(true);
		await deletePost(postID);
		onShowPopup(false);
		setConfirmLoading(false);
	};

	const handleCancel = () => {
		onShowPopup(false);
	};

	return (
		<Popconfirm
			title='Are you sure?'
			placement='topRight'
			description='You are about to delete this post, this can not be undone!'
			open={showPopup}
			onConfirm={handleOk}
			okButtonProps={{ loading: confirmLoading }}
			onCancel={handleCancel}
		/>
	);
};

export default PostConfirmDelete;
