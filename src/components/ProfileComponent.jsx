import { useParams } from 'react-router-dom';
import { useAuthState } from '../hooks/use-AuthStatus';
import { useEffect, useState } from 'react';
import { getPosts, getUserProfile } from '../api/FirestoreAPI';
import Card from './UI/Card';
import BannerBg from '../assets/images/banner.jfif';
import classes from './modules/card.module.css';
import { useDispatch, useSelector } from 'react-redux';
import PostComponent from './PostComponent';

const ProfileComponent = () => {
	useAuthState();
	const dispatch = useDispatch();
	const posts = useSelector((state) => state.posts);
	const [profile, setProfile] = useState({});
	const { id } = useParams();

	useEffect(() => {
		const fetchData = async () => {
			const profile = await getUserProfile(id);
			setProfile(profile);

			//we fetch!
			if (!posts.fetched) {
				const data = await getPosts();
				dispatch(postsActions.addPosts({ posts: data }));
			}
		};

		fetchData();
	}, [id, dispatch, posts.fetched]);

	console.log(profile, posts);

	return (
		<div>
			<Card customClass={classes.profile}>
				<div className={classes['profile-header']}>
					<img
						className={classes.banner}
						src={BannerBg}
						alt=''
					/>
					<img
						className={`${classes['profile-img']} ${classes.large}`}
						src={profile.photo}
						alt=''
					/>
				</div>
				<div className={classes['profile-body']}>
					<div>
						<p className={classes.name}>{profile.name}</p>
						<p className={classes.headline}>
							{profile.headline
								? profile.headline
								: 'No headline has been set'}
						</p>
						<p className={classes.location}>
							{profile.location
								? profile.location
								: 'No location has been set'}
						</p>
					</div>
					<div>
						<p className={classes.company}>
							{profile.company
								? profile.company
								: 'No company has been set'}
						</p>
						<p className={classes.college}>
							{profile.college
								? profile.college
								: 'No college has been set'}
						</p>
					</div>
				</div>
			</Card>
			<Card customClass={classes.profile}>
				<div>
					<h2>User posts </h2>
					<div>
						{console.log(
							posts.posts.filter(
								(post) => post.user.id === profile.id
							)
						)}
						{posts.posts
							.filter((post) => post.user.id === profile.id)
							.map((post) => (
								<Card
									key={post.id}
									customClass={classes['list-item']}
								>
									<PostComponent post={post} />
								</Card>
							))}
					</div>
				</div>
			</Card>
		</div>
	);
};

export default ProfileComponent;
