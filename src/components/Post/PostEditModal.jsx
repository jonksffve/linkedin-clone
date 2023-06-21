const PostEditModal = () => {
	return (
		<Modal
			title={'Update post'}
			open={showModal}
			onCancel={() => {
				setShowModal(false);
			}}
			onOk={() => {
				updatePostContent(post.id, {
					content: editValue.trimEnd(),
				});
				setShowModal(false);
			}}
			valid={formValid}
			action={'Update'}
		>
			<form
				className={classes.form}
				onSubmit={(event) => {
					event.preventDefault();
				}}
			>
				<input
					type='text'
					value={editValue}
					onChange={(event) => {
						setEditValue(event.target.value.trimStart());
						setFormValid(event.target.value.trim().length !== 0);
					}}
				/>
			</form>
		</Modal>
	);
};

export default PostEditModal;
