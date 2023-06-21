import { onAuthStateChanged } from '@firebase/auth';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../firebaseConfig';
import { userActions } from '../store/user-slice';
import { useNavigate } from 'react-router';
import { ROUTE_LOGIN } from '../helpers/config';
import { getUserId, getUserProfile } from '../api/FirestoreAPI';

export const useAuthState = (route = null, setLoading) => {
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
				navigate(ROUTE_LOGIN);
			}
			setLoading(false);
		});
	}, [route, dispatch, navigate, setLoading]);
};
