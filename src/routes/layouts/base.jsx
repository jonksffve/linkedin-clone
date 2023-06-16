import classes from '../../components/modules/baselayout.module.css';
import { Outlet } from 'react-router-dom';
import MainNavigation from '../../components/UI/Menu/NavBar';
import { Fragment } from 'react';

const BaseLayout = () => {
	return (
		<Fragment>
			<MainNavigation />
			<main className={classes.container}>
				<Outlet />
			</main>
		</Fragment>
	);
};

export default BaseLayout;
