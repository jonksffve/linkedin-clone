import { useEffect, useState } from 'react';
import classes from './modules/auth.module.css';
import { LoginAPI, GoogleSignInAPI } from '../api/AuthAPI';
import GoogleIcon from '../assets/icons/google-logo-icon.png';
import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import * as helper from '../helpers/config';

const LoginComponent = () => {
	const [credentials, setCredentials] = useState({});
	const navigate = useNavigate();

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				navigate(helper.ROUTE_HOME);
			}
		});
	}, [navigate]);

	const googleLoginHandler = async () => {
		await GoogleSignInAPI();
		navigate(helper.ROUTE_HOME);
	};

	const submitHandler = async (event) => {
		event.preventDefault();
		await LoginAPI(credentials.email, credentials.password);
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
