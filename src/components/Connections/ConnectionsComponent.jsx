import Card from '../UI/Card';
import classes from '../modules/card.module.css';
import { useEffect, useState } from 'react';
import { getAllUsers } from '../../api/FirestoreAPI';
import Connection from './Connection';

const ConnectionsComponent = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		getAllUsers(setUsers);
	}, []);

	console.log(users);
	return (
		<Card customClass={classes.connections}>
			<h2>Follow more professionals!</h2>
			{users.map((user) => {
				return (
					<Connection
						key={user.id}
						user={user}
					/>
				);
			})}
		</Card>
	);
};

export default ConnectionsComponent;
