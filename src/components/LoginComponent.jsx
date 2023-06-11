import { useState } from 'react';
import classes from './logincomponent.module.css';
import { LoginAPI } from '../api/AuthAPI';
import GoogleIcon from '../assets/icons/google-logo-icon.png';

const LoginComponent = () => {
	const [credentials, setCredentials] = useState({});

	const submitHandler = async (event) => {
		event.preventDefault();
		try {
			const response = await LoginAPI(
				credentials.email,
				credentials.password
			);
			console.log(response);
		} catch (err) {
			console.log(err.code);
		}
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
					<a
						href='#'
						className={classes.link}
					>
						Join us today!
					</a>
				</p>
			</form>
		</div>
	);
};

export default LoginComponent;
