import { useEffect } from 'react';
import classes from './modules/home.module.css';
import { useNavigate } from 'react-router-dom';
import * as helper from '../helpers/config';
import PostFormComponent from './PostFormComponent';
import PostListComponent from './PostListComponent';
import { useSelector } from 'react-redux';

const HomeComponent = () => {
	const navigate = useNavigate();
	const user = useSelector((state) => state.user);

	useEffect(() => {
		if (!user.email) {
			navigate(helper.ROUTE_LOGIN);
		}
	}, [user, navigate]);

	return (
		<div className={classes.container}>
			<PostFormComponent />
			<PostListComponent />
		</div>
	);
};

export default HomeComponent;
