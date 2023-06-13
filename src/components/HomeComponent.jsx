import classes from './modules/home.module.css';
import * as helper from '../helpers/config';
import PostFormComponent from './PostFormComponent';
import PostListComponent from './PostListComponent';
import { useAuthState } from '../hooks/use-AuthStatus';

const HomeComponent = () => {
	useAuthState(helper.ROUTE_LOGIN);

	return (
		<div className={classes.container}>
			<PostFormComponent />
			<PostListComponent />
		</div>
	);
};

export default HomeComponent;
