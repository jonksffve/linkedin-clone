import { useAuthState } from '../hooks/use-AuthStatus';

const ProfileComponent = () => {
	useAuthState();

	return <h2>Profile component</h2>;
};

export default ProfileComponent;
