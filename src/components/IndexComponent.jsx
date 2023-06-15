import { Fragment } from 'react';
import { useAuthState } from '../hooks/use-AuthStatus';

const IndexComponent = () => {
	useAuthState();

	return (
		<Fragment>
			<h2>This is my personal project</h2>
			<p>Hello, WORLD!</p>
			<p>I welcome you</p>
		</Fragment>
	);
};

export default IndexComponent;
