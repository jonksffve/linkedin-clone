import classes from '../modules/navbar.module.css';
import LogoIcon from '../../assets/icons/linkedin-logo-icon.png';
import { Link } from 'react-router-dom';
import * as helper from '../../helpers/config';
import { AiOutlineSearch, AiOutlineHome, AiOutlineBell } from 'react-icons/ai';
import { BsPeople, BsBriefcase, BsChatDots } from 'react-icons/bs';
import { TbGridDots } from 'react-icons/tb';
import { ImNewspaper } from 'react-icons/im';
import UserIcon from '../../assets/icons/user.png';
import { LogoutAPI } from '../../api/AuthAPI';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../store/user-slice';

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
					<div>
						<ul className={classes.links}>
							<li className={classes.link}>
								<a href='#'>
									<AiOutlineSearch
										size={30}
										className={classes.icon}
									/>
								</a>
							</li>
							<li className={classes.link}>
								<Link to={helper.ROUTE_HOME}>
									<AiOutlineHome
										size={30}
										className={classes.icon}
									/>
								</Link>
							</li>
							<li className={classes.link}>
								<a href='#'>
									<BsPeople
										size={30}
										className={classes.icon}
									/>
								</a>
							</li>
							<li className={classes.link}>
								<a href='#'>
									<BsBriefcase
										size={30}
										className={classes.icon}
									/>
								</a>
							</li>
							<li className={classes.link}>
								<a href='#'>
									<BsChatDots
										size={30}
										className={classes.icon}
									/>
								</a>
							</li>
							<li className={classes.link}>
								<a href='#'>
									<TbGridDots
										size={30}
										className={classes.icon}
									/>
								</a>
							</li>

							<li className={classes.link}>
								<a href='#'>
									<AiOutlineBell
										size={30}
										className={classes.icon}
									/>
								</a>
							</li>
							<li className={classes.link}>
								<a href='#'>
									<ImNewspaper
										size={30}
										className={classes.icon}
									/>
								</a>
							</li>
						</ul>
					</div>
					<div>
						<a href='#'>
							<img
								className={classes['profile-img']}
								src={UserIcon}
								alt=''
							/>
						</a>
						<button
							type='button'
							onClick={logoutHandler}
						>
							Sign out
						</button>
					</div>
				</Fragment>
			)}

			{!user.email && (
				<div>
					<Link to={helper.ROUTE_LOGIN}>
						<button className={classes['login-btn']}>Login</button>
					</Link>
				</div>
			)}
		</nav>
	);
};

export default NavBar;
