import classes from '../modules/navbar.module.css';
import LogoIcon from '../../assets/icons/linkedin-logo-icon.png';
import { Link } from 'react-router-dom';
import * as helper from '../../helpers/config';

const NavBar = () => {
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
			<div>
				<ul className={classes.links}>
					<li className={classes['link-item']}>Home</li>
					<li className={classes['link-item']}>About</li>
				</ul>
			</div>
			<div>
				<img
					src='#'
					alt=''
				/>
				<p>Log out</p>
			</div>
		</nav>
	);
};

export default NavBar;
