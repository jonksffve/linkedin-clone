import classes from './modules/card.module.css';
import Card from './UI/Card';
import { useSelector } from 'react-redux';
import ProfileHeader from './Profile/ProfileHeader';
import PostListComponent from './Post/PostListComponent';
import { useParams } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { getUserProfile, getPosts } from '../api/FirestoreAPI';

const UserProfileComponent = () => {
	const user = useSelector((state) => state.user);
	const [isLoading, setIsLoading] = useState(true);
	const [posts, setPosts] = useState([]);
	const [profileUser, setProfileUser] = useState({});
	const [editable, setEditable] = useState(false);
	const { id } = useParams();

	useMemo(async () => {
		await getUserProfile(id, setProfileUser);
		if (id === user.id) {
			setEditable(true);
		}

		await getPosts(setPosts, setIsLoading, id);
	}, [id, user.id]);

	return (
		<div className={classes['profile-wrapper']}>
			<Card customClass={classes.profile}>
				<ProfileHeader
					user={profileUser}
					editable={editable}
				/>
			</Card>
			<PostListComponent
				isLoading={isLoading}
				posts={posts.filter((post) => post.userID === id)}
			/>
		</div>
	);
};

export default UserProfileComponent;
