import classes from './modules/card.module.css';
import { Link } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useSelector } from 'react-redux';

//<AiFillHeart />

const PostComponent = ({ post }) => {
	const user = useSelector((state) => state.user);

	const likeHandler = () => {
		console.log(`Clicked: ${post.id} by ${user.id}`);
	};

	return (
		<div className={classes.profile}>
			<div className={classes.header}>
				<Link to={`/account/${post.user.id}`}>
					<img
						className={`${classes['profile-img']} ${classes.small}`}
						src={post.user.photo}
						alt=''
					/>
				</Link>
				<div className={classes.subheader}>
					<Link to={`/account/${post.user.id}`}>
						<h3>{post.user.name}</h3>
					</Link>
					<small>
						{post.user.headline ? post.user.headline : ''}
					</small>
				</div>
			</div>
			<small>{post.timeStamp}</small>
			<p>{post.content}</p>
			<div className={classes['btn-container']}>
				<AiOutlineHeart onClick={likeHandler} />
				<button>Comment</button>
				<button>3rd</button>
			</div>
		</div>
	);
};

export default PostComponent;
