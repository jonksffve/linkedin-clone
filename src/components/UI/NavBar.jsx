import classes from '../modules/navbar.module.css';
import LogoIcon from '../../assets/icons/linkedin-logo-icon.png';
import { Link } from 'react-router-dom';

const NavBar = () => {
	return (
		<div className={classes.navigation}>
			<Link to='/'>
				<img
					className={classes.logo}
					src={LogoIcon}
					alt=''
				/>
			</Link>
		</div>
	);
};

export default NavBar;
