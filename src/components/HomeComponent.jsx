import classes from './modules/home.module.css';
import Spinner from './UI/Spinner';

const HomeComponent = () => {
	return (
		<div className={classes.container}>
			<Spinner />
		</div>
	);
};

export default HomeComponent;
