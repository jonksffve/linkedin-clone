import classes from '../../modules/navbar.module.css';
import LogoIcon from '../../../assets/icons/linkedin-logo-icon.png';
import { Link } from 'react-router-dom';
import * as helper from '../../../helpers/config';
import {
	AiOutlineSearch,
	AiOutlineHome,
	AiOutlineBell,
	AiOutlineUserSwitch,
} from 'react-icons/ai';
import { BsBriefcase, BsChatDots } from 'react-icons/bs';
import { TbGridDots } from 'react-icons/tb';
import { ImNewspaper } from 'react-icons/im';
import { LogoutAPI } from '../../../api/AuthAPI';
import { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../../store/user-slice';
import MenuCard from './MenuCard';

const NavBar = () => {
	const user = useSelector((state) => state.user);
	const [showMenu, setShowMenu] = useState(false);
	const dispatch = useDispatch();

	const menuHandler = () => {
		setShowMenu(!showMenu);
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
					<div>
						<ul className={classes.links}>
							<li className={classes.link}>
								<Link to={''}>
									<AiOutlineSearch
										size={30}
										className={classes.icon}
									/>
								</Link>
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
								<Link to={helper.ROUTE_CONNECTIONS}>
									<AiOutlineUserSwitch
										size={30}
										className={classes.icon}
									/>
								</Link>
							</li>
							<li className={classes.link}>
								<Link to={''}>
									<BsBriefcase
										size={30}
										className={classes.icon}
									/>
								</Link>
							</li>
							<li className={classes.link}>
								<Link to={''}>
									<BsChatDots
										size={30}
										className={classes.icon}
									/>
								</Link>
							</li>
							<li className={classes.link}>
								<Link to={''}>
									<TbGridDots
										size={30}
										className={classes.icon}
									/>
								</Link>
							</li>

							<li className={classes.link}>
								<Link to={''}>
									<AiOutlineBell
										size={30}
										className={classes.icon}
									/>
								</Link>
							</li>
							<li className={classes.link}>
								<Link to={''}>
									<ImNewspaper
										size={30}
										className={classes.icon}
									/>
								</Link>
							</li>
						</ul>
					</div>
					<div className={classes.menuCard}>
						<img
							onClick={menuHandler}
							className={classes['profile-img']}
							src={user.photo}
							alt=''
						/>
						{showMenu && <MenuCard onLogout={logoutHandler} />}
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
