import { useEffect } from 'react';
import classes from './modules/home.module.css';
import { useNavigate } from 'react-router-dom';
import * as helper from '../helpers/config';
import PostFormComponent from './PostFormComponent';
import PostListComponent from './PostListComponent';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { userActions } from '../store/user-slice';

const HomeComponent = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		onAuthStateChanged(auth, (curUser) => {
			if (curUser) {
				const { displayName: name, email, photoURL: photo } = curUser;
				dispatch(
					userActions.setUserLoginState({
						name,
						email,
						photo,
					})
				);
			} else {
				navigate(helper.ROUTE_LOGIN);
			}
		});
	}, [dispatch, navigate]);

	return (
		<div className={classes.container}>
			<PostFormComponent />
			<PostListComponent />
		</div>
	);
};

export default HomeComponent;
