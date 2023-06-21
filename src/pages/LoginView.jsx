import LoginComponent from '../components/LoginComponent';
import { useState } from 'react';
import { useAuthState } from '../hooks/use-AuthStatus';
import Spinner from '../components/UI/Spinner';
import { ROUTE_HOME } from '../helpers/config';

const LoginView = () => {
	const [loading, setLoading] = useState(true);
	useAuthState(ROUTE_HOME, setLoading);

	return loading ? <Spinner /> : <LoginComponent />;
};

export default LoginView;
