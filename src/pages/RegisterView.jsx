import RegisterComponent from '../components/RegisterComponent';
import { useState } from 'react';
import { useAuthState } from '../hooks/use-AuthStatus';
import Spinner from '../components/UI/Spinner';
import { ROUTE_HOME } from '../helpers/config';

const RegisterView = () => {
	const [loading, setLoading] = useState(true);
	useAuthState(ROUTE_HOME, setLoading, true);

	return loading ? <Spinner /> : <RegisterComponent />;
};

export default RegisterView;
