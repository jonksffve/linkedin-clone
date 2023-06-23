import classes from '../../modules/navbar.module.css';
import { BiLogOut } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { ROUTE_PROFILE } from '../../../helpers/config';

const SubMenuLinks = ({ user, onLogout }) => {
	return (
		<div className={classes['submenu-container']}>
			<Link
				to={`${ROUTE_PROFILE}/${user.id}`}
				className={classes['submenu-item']}
			>
				<img
					className={classes['profile-img']}
					src={user.photo}
					alt=''
				/>
				<h3>{user.name}</h3>
			</Link>

			<hr />
			<div
				onClick={onLogout}
				className={classes['submenu-item']}
			>
				<BiLogOut size={20} />
				<span>Logout</span>
			</div>
		</div>
	);
};

export default SubMenuLinks;
