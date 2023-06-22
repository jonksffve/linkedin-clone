import { Popover } from 'antd';
import classes from '../modules/navbar.module.css';

const PopoverWrapper = ({ title, children, user }) => {
	const content = <div>{children}</div>;

	console.log(children);

	return (
		<Popover
			className={classes.menuCard}
			content={content}
			title={title}
			trigger='click'
		>
			<img
				className={classes['profile-img']}
				src={user.photo}
				alt=''
			/>
		</Popover>
	);
};

export default PopoverWrapper;
