import classes from '../../modules/card.module.css';
import Card from '../Card';
import { BiLogOut } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ROUTE_PROFILE } from '../../../helpers/config';

const MenuCard = ({ onLogout }) => {
	const user = useSelector((state) => state.user);

	return (
		<Card customClass={classes.toggleMenu}>
			<Link
				className={classes['menu-item']}
				to={ROUTE_PROFILE}
			>
				<Card customClass={classes.menuHeader}>
					<img
						className={`${classes['profile-img']} ${classes.small}`}
						src={user.photo}
						alt=''
					/>
					<h3>{user.name}</h3>
				</Card>
			</Link>
			<p>item 2</p>
			<button
				onClick={onLogout}
				className={classes['menu-item']}
			>
				<BiLogOut />
				<span>Logout</span>
			</button>
		</Card>
	);
};

export default MenuCard;
