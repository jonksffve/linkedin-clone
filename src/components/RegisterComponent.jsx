import classes from './modules/auth.module.css';
import GoogleIcon from '../assets/icons/google-logo-icon.png';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { RegisterAPI, GoogleSignInAPI } from '../api/AuthAPI';
import { toast } from 'react-toastify';
import { toastOptions } from '../toastConfig';

const RegisterComponent = () => {
	const [credentials, setCredentials] = useState({});
	const navigate = useNavigate();

	const googleRegisterHandler = async () => {
		await GoogleSignInAPI();
		navigate('/login');
	};

	const submitHandler = async (event) => {
		event.preventDefault();
		try {
			const response = await RegisterAPI(
				credentials.email,
				credentials.password
			);
			toast.success('Succesfully created account', toastOptions);
			navigate('/login');
		} catch (err) {
			toast.error('Cannot create your account', toastOptions);
		}
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
						to={'/login'}
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
