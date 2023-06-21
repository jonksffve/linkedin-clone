import classes from '../modules/card.module.css';

const PostContent = ({ content }) => {
	return (
		<div className={classes['comment-content']}>
			<p>{content}</p>
		</div>
	);
};

export default PostContent;
