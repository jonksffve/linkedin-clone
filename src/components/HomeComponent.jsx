import { useEffect } from 'react';
import classes from './modules/home.module.css';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import * as helper from '../helpers/config';
import { auth } from '../firebaseConfig';
import PostFormComponent from './PostFormComponent';
import PostListComponent from './PostListComponent';
import { useSelector } from 'react-redux';

const HomeComponent = () => {
	const navigate = useNavigate();
	const user = useSelector((state) => state.user);

	console.log(user);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (!user) {
				navigate(helper.ROUTE_LOGIN);
			}
		});
	}, [navigate]);

	return (
		<div className={classes.container}>
			<PostFormComponent />
			<PostListComponent />
		</div>
	);
};

export default HomeComponent;
