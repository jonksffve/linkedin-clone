import { toast } from 'react-toastify';
import { toastOptions } from '../toastConfig';
import { firestore } from '../firebaseConfig';
import {
	addDoc,
	collection,
	getDoc,
	where,
	getDocs,
	orderBy,
	query,
	doc,
	updateDoc,
	Timestamp,
	setDoc,
	onSnapshot,
	deleteDoc,
} from 'firebase/firestore';
import moment from 'moment/moment';

const dbPostsRef = collection(firestore, 'posts');
const dbProfilesRef = collection(firestore, 'profiles');
const dbLikesRef = collection(firestore, 'likes');
const dbCommentsRef = collection(firestore, 'comments');

export const createPost = async ({ user, content }) => {
	const objectData = {
		user: {
			id: user.id,
			name: user.name,
			headline: user.headline || '',
			photo: user.photo,
		},
		content,
		timeStamp: Timestamp.now(),
	};

	try {
		await addDoc(dbPostsRef, objectData);
		toast.success('Post created succesfully.', toastOptions);
	} catch (error) {
		console.log(error);
		toast.error('Something happened, could not create post.', toastOptions);
	}
};

export const getPosts = async (setPosts) => {
	onSnapshot(query(dbPostsRef, orderBy('timeStamp', 'desc')), (response) => {
		const arrayData = response.docs.map((doc) => {
			const { user, content, timeStamp } = doc.data();
			return {
				id: doc.id,
				user,
				content,
				timeStamp: moment(timeStamp.toDate()).format('lll'),
			};
		});
		setPosts(arrayData);
	});
};

export const getLikes = async (postID, userID, setLikeStatus) => {
	onSnapshot(query(dbLikesRef, where('postID', '==', postID)), (response) => {
		const arrayData = response.docs.map((doc) => doc.data());
		setLikeStatus({
			likesCount: arrayData?.length,
			isLikedByUser: arrayData.some((el) => el.userID === userID),
		});
	});
};

export const createProfile = async ({ name, email, photo = 'none' }) => {
	const profileObj = {
		name,
		email,
		photo,
	};

	try {
		const profile = await getDocs(
			query(dbProfilesRef, where('email', '==', email))
		);

		//Guard clase if it's created already!
		if (profile.docs.length > 0) {
			return;
		}

		await addDoc(dbProfilesRef, profileObj);
	} catch (error) {
		toast.error(
			'Something happened, could not create profile.',
			toastOptions
		);
	}
};

export const getUserProfile = async (id) => {
	try {
		const docRef = doc(dbProfilesRef, id);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			return { ...docSnap.data(), id };
		}
		return new Error('Document does not exist.');
	} catch (error) {
		toast.error(
			'Something happened, could not retrieve profile.',
			toastOptions
		);
	}
};

export const getUserId = async (email) => {
	try {
		const profile = await getDocs(
			query(dbProfilesRef, where('email', '==', email))
		);

		if (profile.docs.length > 0) {
			return { id: profile.docs[0].id };
		}

		return undefined;
	} catch (error) {
		toast.error('Something happened, could not get user ID.', toastOptions);
	}
};

export const updateUserInformation = async (id, objectData) => {
	try {
		const profileRef = doc(dbProfilesRef, id);
		await updateDoc(profileRef, objectData);
		toast.success('Profile updated succesfully.', toastOptions);
	} catch (error) {
		toast.error(
			'Something happened, could not update user profile.',
			toastOptions
		);
	}
};

export const likePost = async (postID, userID, isLiked) => {
	try {
		const likeRef = doc(dbLikesRef, `${postID}_${userID}`);
		if (isLiked) {
			await deleteDoc(likeRef);
		} else {
			await setDoc(likeRef, { postID, userID });
		}
	} catch (error) {
		toast.error('Something happened, could not like post.', toastOptions);
	}
};

export const createComment = async (postID, userID, comment) => {
	try {
		await addDoc(dbCommentsRef, {
			postID,
			userID,
			comment,
		});
		toast.success('Comment sent to post.', toastOptions);
	} catch (error) {
		toast.error(
			'Something happened, could not create comment.',
			toastOptions
		);
	}
};

export const getComments = async (postID, setCommentStatus) => {
	onSnapshot(
		query(dbCommentsRef, where('postID', '==', postID)),
		(response) => {
			const arrayData = response.docs.map((doc) => {
				return { id: doc.id, ...doc.data() };
			});
			setCommentStatus({
				comments: arrayData,
				commentCount: arrayData.length,
			});
		}
	);
};
