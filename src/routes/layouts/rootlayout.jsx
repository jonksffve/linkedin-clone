import classes from './rootlayout.module.css';
import { Outlet } from 'react-router-dom';
import MainNavigation from '../components/UI/NavBar';
import { Fragment } from 'react';

const RootLayout = () => {
	return (
		<Fragment>
			<MainNavigation />
			<main className={classes.container}>
				<Outlet />
			</main>
		</Fragment>
	);
};

export default RootLayout;
