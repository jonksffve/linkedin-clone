import { useState } from 'react';
import { useAuthState } from '../hooks/use-AuthStatus';
import Card from './UI/Card';
import classes from './modules/profile.module.css';
import { useSelector } from 'react-redux';
import { updateUserInformation } from '../api/FirestoreAPI';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PROFILE } from '../helpers/config';
import { IoReturnDownBackOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const ProfileEditComponent = () => {
	useAuthState();
	const navigate = useNavigate();
	const [formValues, setFormValues] = useState({});
	const user = useSelector((state) => state.user);

	const submitHandler = (event) => {
		event.preventDefault();
		if (Object.keys(formValues).length === 0) {
			return navigate(ROUTE_PROFILE);
		}
		updateUserInformation(user.id, formValues);
		setFormValues({});
		navigate(ROUTE_PROFILE);
	};

	const inputHandler = (event) => {
		const { name, value } = event.target;
		const input = { [name]: value };
		setFormValues({
			...formValues,
			...input,
		});
	};

	return (
		<Card>
			<Link to={ROUTE_PROFILE}>
				<IoReturnDownBackOutline size={24} />
			</Link>
			<form
				className={classes.form}
				onSubmit={submitHandler}
				autoComplete='off'
			>
				<label htmlFor='name'>Name</label>
				<input
					onChange={inputHandler}
					type='text'
					name='name'
					id='name'
					placeholder={user.name}
				/>
				<label htmlFor='headline'>Headline</label>
				<input
					onChange={inputHandler}
					type='text'
					name='headline'
					id='headline'
					placeholder={
						user.headline ? user.headline : 'What defines you?'
					}
				/>
				<label htmlFor='location'>Location</label>
				<input
					onChange={inputHandler}
					type='text'
					name='location'
					id='location'
					placeholder={
						user.location ? user.location : 'Where do you live?'
					}
				/>
				<label htmlFor='company'>Company</label>
				<input
					onChange={inputHandler}
					type='text'
					name='company'
					id='company'
					placeholder={
						user.company ? user.company : 'Where do you work?'
					}
				/>
				<label htmlFor='college'>College/University</label>
				<input
					onChange={inputHandler}
					type='text'
					name='college'
					id='college'
					placeholder={
						user.college ? user.college : 'Where did you study?'
					}
				/>
				<button type='submit'>Save</button>
			</form>
		</Card>
	);
};

export default ProfileEditComponent;
