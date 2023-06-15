import classes from './modules/card.module.css';
import { useAuthState } from '../hooks/use-AuthStatus';
import Card from './UI/Card';
import { useSelector } from 'react-redux';
import BannerBg from '../assets/images/banner.png';
import { BiEdit } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { ROUTE_EDIT } from '../helpers/config';

const ProfileComponent = () => {
	const user = useSelector((state) => state.user);
	useAuthState();

	return (
		<Card customClass={classes.profile}>
			<div className={classes['profile-header']}>
				<img
					className={classes.banner}
					src={BannerBg}
					alt=''
				/>
				<img
					className={`${classes['profile-img']} ${classes.large}`}
					src={user.photo}
					alt=''
				/>
			</div>
			<div className={classes['profile-body']}>
				<div>
					<p>{user.name}</p>
					<p>Titles</p>
					<p>Comments</p>
				</div>
				<div>
					<p>Group</p>
					<p>University</p>
				</div>
				<div>
					<Link
						to={ROUTE_EDIT}
						className={classes.link}
					>
						<BiEdit size={25} />
					</Link>
				</div>
			</div>
		</Card>
	);
};

export default ProfileComponent;
