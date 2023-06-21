import ConnectionsComponent from '../components/ConnectionsComponent';
import Spinner from '../components/UI/Spinner';
import { useAuthState } from '../hooks/use-AuthStatus';
import { useState } from 'react';

const ConnectionsView = () => {
	const [loading, setLoading] = useState(true);
	useAuthState(null, setLoading);

	return loading ? <Spinner /> : <ConnectionsComponent />;
};

export default ConnectionsView;
