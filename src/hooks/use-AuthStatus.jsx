import { onAuthStateChanged } from '@firebase/auth';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../firebaseConfig';
import { userActions } from '../store/user-slice';
import { useNavigate } from 'react-router';

export const useAuthState = (route) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

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
				navigate(route);
			}
		});
	}, [route, dispatch, navigate]);
};
