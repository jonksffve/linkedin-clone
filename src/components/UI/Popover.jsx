import { Popover } from 'antd';
import classes from '../modules/navbar.module.css';

const PopoverWrapper = ({ title, children, user, placement }) => {
	const content = <div className={classes.popover}>{children}</div>;

	return (
		<Popover
			content={content}
			title={title}
			trigger='click'
			placement={placement}
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
