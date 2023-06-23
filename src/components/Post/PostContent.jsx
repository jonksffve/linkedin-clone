import classes from '../modules/card.module.css';

const PostContent = ({ content, image }) => {
	return (
		<div className={classes['comment-content']}>
			<p>{content}</p>
			{image && (
				<img
					className={classes['post-img']}
					src={image}
					alt=''
				/>
			)}
		</div>
	);
};

export default PostContent;
