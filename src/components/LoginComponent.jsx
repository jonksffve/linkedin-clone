import classes from './modules/auth.module.css';
import { useState } from 'react';
import { LoginAPI, GoogleSignInAPI } from '../api/AuthAPI';
import GoogleIcon from '../assets/icons/google-logo-icon.png';
import { Link, useNavigate } from 'react-router-dom';
import * as helper from '../helpers/config';
import { useDispatch } from 'react-redux';
import { userActions } from '../store/user-slice';
import { createProfile, getUserId, getUserProfile } from '../api/FirestoreAPI';

const LoginComponent = () => {
	const [credentials, setCredentials] = useState({});
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const googleLoginHandler = async () => {
		const response = await GoogleSignInAPI();
		const { displayName: name, email, photoURL: photo } = response.user;
		await createProfile({ name, email, photo });
		const { id } = await getUserId(email);
		const profile = await getUserProfile(id);
		dispatch(userActions.setUserLoginState(profile));
		navigate(helper.ROUTE_HOME);
	};

	const submitHandler = async (event) => {
		event.preventDefault();
		const response = await LoginAPI(
			credentials.email,
			credentials.password
		);
		const { displayName: name, email, photoURL: photo } = response.user;
		await createProfile({ name, email, photo });
		const { id } = await getUserId(email);
		const profile = await getUserProfile(id);
		dispatch(userActions.setUserLoginState(profile));
		navigate(helper.ROUTE_HOME);
	};

	return (
		<div className={classes.wrapper}>
			<div className={classes.header}>
				<h2>Sign in</h2>
				<small>Stay updated on your professional world</small>
			</div>
			<form
				className={classes.form}
				onSubmit={submitHandler}
				autoComplete='off'
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
						placeholder='Pasword'
						onChange={(event) => {
							setCredentials({
								...credentials,
								password: event.target.value,
							});
						}}
					/>
				</div>
				<p>
					Forgot your information?
					<a
						href='#'
						className={classes.link}
					>
						Recover
					</a>
				</p>
				<div className={classes.btnWrapper}>
					<button
						type='submit'
						className={`${classes.btn} ${classes['btn-submit']}`}
					>
						Login
					</button>
				</div>
				<div className={classes.divider}>or</div>
				<div className={classes.btnWrapper}>
					<button
						className={`${classes.btn} ${classes['btn-login']}`}
						type='button'
						onClick={googleLoginHandler}
					>
						<img
							className={classes.logo}
							src={GoogleIcon}
							alt=''
						/>
						<span>Sign in with Google</span>
					</button>
				</div>
				<p>
					New to LinkedIn?
					<Link
						to={helper.ROUTE_REGISTER}
						className={classes.link}
					>
						Join us today!
					</Link>
				</p>
			</form>
		</div>
	);
};

export default LoginComponent;
