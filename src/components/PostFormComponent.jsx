import Card from './UI/Card';
import userImg from '../assets/icons/user.png';
import classes from './modules/postform.module.css';

const PostFormComponent = () => {
	const modalHandler = () => {
		console.log('clicked');
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
					onClick={modalHandler}
				>
					<span>Create post</span>
				</button>
			</div>
		</Card>
	);
};

export default PostFormComponent;
