import classes from './modules/home.module.css';
import { useNavigate } from 'react-router-dom';
import * as helper from '../helpers/config';
import PostFormComponent from './PostFormComponent';
import PostListComponent from './PostListComponent';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { userActions } from '../store/user-slice';
import { getPosts } from '../api/FirestoreAPI';
import { useEffect, useState } from 'react';
import Spinner from './UI/Spinner';

const HomeComponent = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [posts, setPosts] = useState([]);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchData = async () => {
			const data = await getPosts();
			setPosts(data);
			setIsLoading(false);
		};

		fetchData();
	}, []);

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
			{isLoading && <Spinner />}
			{!isLoading && <PostListComponent posts={posts} />}
		</div>
	);
};

export default HomeComponent;
