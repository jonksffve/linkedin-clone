import Card from './UI/Card';
import classes from './modules/card.module.css';
import ImgBanner from '../assets/images/banner.jfif';
import ImgPhoto from '../assets/images/profile.jpg';

const ConnectionsComponent = () => {
	return (
		<Card customClass={classes.connections}>
			<h2>Follow more professionals!</h2>
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
					<h3>Name</h3>
					<small>Headline</small>
				</div>
				<button>Connect</button>
			</Card>
		</Card>
	);
};

export default ConnectionsComponent;
