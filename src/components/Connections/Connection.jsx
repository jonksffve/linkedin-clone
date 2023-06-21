import classes from '../modules/card.module.css';
import Card from '../UI/Card';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';

const Connection = ({ user }) => {
	return (
		<Card customClass={classes['card-connection']}>
			<div className={classes.header}>
				<img
					className={classes.banner}
					src={user.banner}
					alt=''
				/>
				<img
					className={`${classes['profile-img']} ${classes.medium}`}
					src={user.photo}
					alt=''
				/>
			</div>
			<div className={classes.subheader}>
				<h3>{user.name}</h3>
				<small>{user.headline}</small>
			</div>
			<button>
				<AiOutlineUsergroupAdd size={24} />
				Connect
			</button>
		</Card>
	);
};

export default Connection;
