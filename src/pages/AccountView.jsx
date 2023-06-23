import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { ROUTE_LOGIN, ROUTE_PROFILE } from '../helpers/config';
import { getUserId } from '../api/FirestoreAPI';

const AccountView = () => {
	const navigate = useNavigate();

	useEffect(() => {
		onAuthStateChanged(auth, async (curUser) => {
			if (curUser) {
				const { id } = await getUserId(curUser.email);
				navigate(`${ROUTE_PROFILE}/${id}`);
			} else {
				navigate(ROUTE_LOGIN);
			}
		});
	}, []);
};

export default AccountView;
