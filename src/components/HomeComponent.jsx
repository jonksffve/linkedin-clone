import { useEffect } from 'react';
import classes from './modules/home.module.css';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import * as helper from '../helpers/config';
import { auth } from '../firebaseConfig';

const HomeComponent = () => {
	const navigate = useNavigate();

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (!user) {
				navigate(helper.ROUTE_LOGIN);
			}
		});
	}, [navigate]);

	return (
		<div className={classes.container}>
			<h2>Home route</h2>
		</div>
	);
};

export default HomeComponent;
