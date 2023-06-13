import classes from './modules/home.module.css';
import PostFormComponent from './PostFormComponent';
import PostListComponent from './PostListComponent';
import { useAuthState } from '../hooks/use-AuthStatus';

const HomeComponent = () => {
	useAuthState();

	return (
		<div className={classes.container}>
			<PostFormComponent />
			<PostListComponent />
		</div>
	);
};

export default HomeComponent;
