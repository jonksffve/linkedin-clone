import { onAuthStateChanged } from '@firebase/auth';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../firebaseConfig';
import { userActions } from '../store/user-slice';
import { useNavigate } from 'react-router';
import * as helper from '../helpers/config';

export const useAuthState = (route = null) => {
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
				if (route) {
					navigate(route);
				}
			} else {
				navigate(helper.ROUTE_LOGIN);
			}
		});
	}, [route, dispatch, navigate]);
};
