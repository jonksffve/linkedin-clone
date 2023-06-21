import { useState } from 'react';
import HomeComponent from '../components/HomeComponent';
import { useAuthState } from '../hooks/use-AuthStatus';
import Spinner from '../components/UI/Spinner';

const HomeView = () => {
	const [loading, setLoading] = useState(true);
	useAuthState(null, setLoading);

	return loading ? <Spinner /> : <HomeComponent />;
};

export default HomeView;
