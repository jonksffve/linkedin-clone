import { useState } from 'react';
import classes from './logincomponent.module.css';
import { LoginAPI } from '../api/AuthAPI';

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
			<h2>Login component</h2>
			<form
				className={classes.form}
				onSubmit={submitHandler}
			>
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
				<div className={classes.btnWrapper}>
					<button
						type='button'
						className={`${classes.btn} ${classes['btn-cancel']}`}
					>
						Cancel
					</button>
					<button
						type='submit'
						className={`${classes.btn} ${classes['btn-submit']}`}
					>
						Login
					</button>
				</div>
			</form>
		</div>
	);
};

export default LoginComponent;
