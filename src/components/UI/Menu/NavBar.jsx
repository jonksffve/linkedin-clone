import classes from '../../modules/navbar.module.css';
import LogoIcon from '../../../assets/icons/linkedin-logo-icon.png';
import { Link } from 'react-router-dom';
import * as helper from '../../../helpers/config';
import { LogoutAPI } from '../../../api/AuthAPI';
import { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../../store/user-slice';
import MenuLinks from './MenuLinks';
import Popover from '../Popover';

const NavBar = () => {
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const logoutHandler = async () => {
		await LogoutAPI();
		dispatch(userActions.setUserLogoutState());
	};

	return (
		<nav className={classes.navigation}>
			<div>
				<Link to={helper.ROUTE_ROOT}>
					<img
						className={classes.logo}
						src={LogoIcon}
						alt=''
					/>
				</Link>
			</div>
			{user.email && (
				<Fragment>
					<MenuLinks />
					<Popover user={user}></Popover>
				</Fragment>
			)}

			{!user.email && (
				<div>
					<Link to={helper.ROUTE_LOGIN}>
						<button className={classes.btn}>Login</button>
					</Link>
				</div>
			)}
		</nav>
	);
};

export default NavBar;
