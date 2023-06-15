import { onAuthStateChanged } from '@firebase/auth';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../firebaseConfig';
import { userActions } from '../store/user-slice';
import { useNavigate } from 'react-router';
import * as helper from '../helpers/config';
import { getUserId, getUserProfile } from '../api/FirestoreAPI';

export const useAuthState = (route = null) => {
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
				navigate(helper.ROUTE_LOGIN);
			}
		});
	}, [route, dispatch, navigate]);
};
