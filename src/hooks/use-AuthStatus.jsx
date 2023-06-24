import { onAuthStateChanged } from '@firebase/auth';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../firebaseConfig';
import { userActions } from '../store/user-slice';
import { useNavigate } from 'react-router';
import { ROUTE_LOGIN } from '../helpers/config';
import { getUserId, getUserProfile } from '../api/FirestoreAPI';

/**
 * Custom hook that will check if a user is loggedin (on our backend service) and act accordingly to that state
 * IF a user is logged in, it will then update the redux user slice with the needed data and redirect if needed
 * IF a user is not logged in, it will redirect to login page or it will let the user join register page
 *
 *
 *
 * @param { string } route The desired route to redirect the user
 * @param { function } setLoading Function to update loading component's state
 * @param { boolean } register way to determine if current page is the register page to avoid redirect to login
 */

export const useAuthState = (route = null, setLoading, register = false) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		onAuthStateChanged(auth, async (curUser) => {
			if (curUser) {
				const { id } = await getUserId(curUser.email);
				const profile = await getUserProfile(id);
				dispatch(userActions.setUserLoginState(profile));
				if (route) {
					navigate(route);
				}
			} else {
				if (register) {
					setLoading(false);
					return;
				}
				navigate(ROUTE_LOGIN);
			}
			setLoading(false);
		});
	}, [route, dispatch, navigate, setLoading, register]);
};
