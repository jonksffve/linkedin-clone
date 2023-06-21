import ImgBanner from '../../assets/images/banner.jfif';
import ImgPhoto from '../../assets/images/profile.jpg';
import classes from '../modules/card.module.css';
import Card from '../UI/Card';

const Connection = ({ user }) => {
	return (
		<Card customClass={classes['card-connection']}>
			<div className={classes.header}>
				<img
					className={classes.banner}
					src={ImgBanner}
					alt=''
				/>
				<img
					className={`${classes['profile-img']} ${classes.medium}`}
					src={ImgPhoto}
					alt=''
				/>
			</div>
			<div className={classes.subheader}>
				<h3>{user.name}</h3>
				<small>{user.headline}</small>
			</div>
			<button>Connect</button>
		</Card>
	);
};

export default Connection;
