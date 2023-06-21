import ProfileEditComponent from '../components/ProfileEditComponent';
import Spinner from '../components/UI/Spinner';
import { useAuthState } from '../hooks/use-AuthStatus';
import { useState } from 'react';

const ProfileEditView = () => {
	const [loading, setLoading] = useState(true);
	useAuthState(null, setLoading);

	return loading ? <Spinner /> : <ProfileEditComponent />;
};

export default ProfileEditView;
