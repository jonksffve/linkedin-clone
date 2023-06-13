import classes from './modules/auth.module.css';
import GoogleIcon from '../assets/icons/google-logo-icon.png';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { RegisterAPI, GoogleSignInAPI } from '../api/AuthAPI';
import * as helper from '../helpers/config';
import { useDispatch } from 'react-redux';
import { userActions } from '../store/user-slice';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { createProfile } from '../api/FirestoreAPI';

const RegisterComponent = () => {
	const [credentials, setCredentials] = useState({});
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
				navigate(helper.ROUTE_HOME);
			}
		});
	}, [dispatch, navigate]);

	const googleRegisterHandler = async () => {
		const response = await GoogleSignInAPI();
		const { displayName: name, email, photoURL: photo } = response.user;
		await createProfile({ name, email, photo });
		dispatch(
			userActions.setUserLoginState({
				name,
				email,
				photo,
			})
		);
		navigate(helper.ROUTE_HOME);
	};

	const submitHandler = async (event) => {
		event.preventDefault();
		await RegisterAPI(credentials.email, credentials.password);
		navigate(helper.ROUTE_HOME);
	};

	return (
		<div className={classes.wrapper}>
			<div className={classes.header}>
				<h2>Make the most of your professional life</h2>
			</div>
			<form
				className={classes.form}
				autoComplete='off'
				onSubmit={submitHandler}
			>
				<div className={classes.inputWrapper}>
					<input
						className={classes.input}
						type='email'
						name='email'
						id='email'
						placeholder='Enter your email'
						onChange={(event) => {
							setCredentials({
								...credentials,
								email: event.target.value,
							});
						}}
					/>
					<input
						className={classes.input}
						type='password'
						name='password'
						id='password'
						placeholder='Pasword (6 or more characters)'
						onChange={(event) => {
							setCredentials({
								...credentials,
								password: event.target.value,
							});
						}}
					/>
				</div>
				<div className={classes.btnWrapper}>
					<button
						type='submit'
						className={`${classes.btn} ${classes['btn-submit']}`}
					>
						Agree & Join
					</button>
				</div>
				<div className={classes.btnWrapper}>
					<button
						type='button'
						className={`${classes.btn} ${classes['btn-login']}`}
						onClick={googleRegisterHandler}
					>
						<img
							className={classes.logo}
							src={GoogleIcon}
							alt=''
						/>
						<span>Continue with Google</span>
					</button>
				</div>
				<p>
					Already on LinkedIn?
					<Link
						to={helper.ROUTE_LOGIN}
						className={classes.link}
					>
						Sign in
					</Link>
				</p>
			</form>
		</div>
	);
};

export default RegisterComponent;
