import classes from './modules/card.module.css';
import { useAuthState } from '../hooks/use-AuthStatus';
import Card from './UI/Card';
import { useSelector } from 'react-redux';
import BannerBg from '../assets/images/banner.png';
import { BiEdit } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { ROUTE_EDIT } from '../helpers/config';

const ProfileComponent = () => {
	useAuthState();
	const user = useSelector((state) => state.user);

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
					<p>
						{user.headline
							? user.headline
							: 'No headline has been set'}
					</p>
					<p>
						{user.location
							? user.location
							: 'No location has been set'}
					</p>
				</div>
				<div>
					<p>
						{user.company
							? user.company
							: 'No company has been set'}
					</p>
					<p>
						{user.collage
							? user.collage
							: 'No collage has been set'}
					</p>
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
