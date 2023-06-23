import classes from '../modules/home.module.css';
import { AiOutlinePicture } from 'react-icons/ai';
import { Progress } from 'antd';

const FormComponent = ({
	uploadProgress,
	postContent,
	setIsValid,
	setPostContent,
	setPostImageURL,
}) => {
	return (
		<form autoComplete='off'>
			<input
				className={classes['form-input']}
				type='text'
				name='content'
				id='content'
				placeholder='What do you want to talk about?'
				value={postContent}
				onChange={(event) => {
					setIsValid(event.target.value.trim().length !== 0);
					setPostContent(event.target.value.trimStart());
				}}
			/>
			<div className={classes['form-icons']}>
				<div className={classes['form-icon']}>
					<label htmlFor='image'>
						<AiOutlinePicture size={24} />
					</label>
					{uploadProgress !== 0 && (
						<Progress
							type='circle'
							percent={uploadProgress}
							size={30}
							showInfo={false}
						/>
					)}
					<input
						onChange={(event) => {
							setIsValid(event.target.files[0].name !== '');
							setPostImageURL(event.target.files[0]);
						}}
						type='file'
						name='image'
						id='image'
						hidden
					/>
				</div>
			</div>
		</form>
	);
};

export default FormComponent;
