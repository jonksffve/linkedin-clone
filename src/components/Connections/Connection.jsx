import { useEffect, useState } from 'react';
import { createConnection, getConnections } from '../../api/FirestoreAPI';
import classes from '../modules/card.module.css';
import Card from '../UI/Card';
import {
	AiOutlineUsergroupAdd,
	AiOutlineUsergroupDelete,
} from 'react-icons/ai';

const Connection = ({ user, currentUserID }) => {
	const [isConnected, setIsConnected] = useState(false);

	useEffect(() => {
		getConnections(currentUserID, user.id, setIsConnected);
	}, [currentUserID, user]);

	const connectHandler = () => {
		createConnection(currentUserID, user.id, isConnected);
	};

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
			{isConnected ? (
				<button
					onClick={connectHandler}
					className={classes.connected}
				>
					<AiOutlineUsergroupDelete size={24} />
					Disconnect
				</button>
			) : (
				<button onClick={connectHandler}>
					<AiOutlineUsergroupAdd size={24} />
					Connect
				</button>
			)}
		</Card>
	);
};

export default Connection;
