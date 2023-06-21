import UserProfileComponent from '../components/UserProfileComponent';
import Spinner from '../components/UI/Spinner';
import { useAuthState } from '../hooks/use-AuthStatus';
import { useState } from 'react';

const UserProfileView = () => {
	const [loading, setLoading] = useState(true);
	useAuthState(null, setLoading);

	return loading ? <Spinner /> : <UserProfileComponent />;
};

export default UserProfileView;
