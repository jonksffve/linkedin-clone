import Card from '../UI/Card';
import classes from '../modules/card.module.css';
import { useEffect, useState } from 'react';
import { getAllUsers } from '../../api/FirestoreAPI';
import Connection from './Connection';
import { useSelector } from 'react-redux';

const ConnectionsComponent = () => {
	const user = useSelector((state) => state.user);
	const [users, setUsers] = useState([]);

	useEffect(() => {
		getAllUsers(setUsers);
	}, []);

	console.log(users);
	return (
		<Card customClass={classes.connections}>
			<h2>Follow more professionals!</h2>
			<div className={classes['connections-wrapper']}>
				{users
					.filter((item) => item.id !== user.id)
					.map((user) => {
						return (
							<Connection
								key={user.id}
								user={user}
							/>
						);
					})}
			</div>
		</Card>
	);
};

export default ConnectionsComponent;
