import classes from '../../modules/navbar.module.css';
import LogoIcon from '../../../assets/icons/linkedin-logo-icon.png';
import { Link } from 'react-router-dom';
import * as helper from '../../../helpers/config';
import { LogoutAPI } from '../../../api/AuthAPI';
import { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../../store/user-slice';
import MenuLinks from './MenuLinks';
import MenuPopup from './MenuCard';

const NavBar = () => {
	const user = useSelector((state) => state.user);
	const [showPopupMenu, setshowPopupMenu] = useState(false);
	const dispatch = useDispatch();

	const menuHandler = () => {
		setshowPopupMenu(!showPopupMenu);
	};

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
					<div className={classes.menuCard}>
						<img
							onClick={menuHandler}
							className={classes['profile-img']}
							src={user.photo}
							alt=''
						/>
						{showPopupMenu && (
							<MenuPopup onLogout={logoutHandler} />
						)}
					</div>
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
