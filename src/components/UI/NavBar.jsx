import classes from './navbar.module.css';
import LogoIcon from '../../assets/icons/linkedin-logo-icon.png';

const NavBar = () => {
	return (
		<div className={classes.navigation}>
			<img
				className={classes.logo}
				src={LogoIcon}
				alt=''
			/>
		</div>
	);
};

export default NavBar;
