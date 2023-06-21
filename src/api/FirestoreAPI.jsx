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

//? REFERENCES TO COLLECTIONS IN FIREBASE
const dbPostsRef = collection(firestore, 'posts');
const dbProfilesRef = collection(firestore, 'profiles');
const dbLikesRef = collection(firestore, 'likes');
const dbCommentsRef = collection(firestore, 'comments');

//* GET METHODS
export const getAllUsers = async () => {
	const response = await getDocs(dbProfilesRef);
	return response;
};

export const getPosts = async (setPosts, setIsLoading) => {
	onSnapshot(query(dbPostsRef, orderBy('timeStamp', 'desc')), (response) => {
		const arrayData = response.docs.map((doc) => {
			const { userID, content, timeStamp } = doc.data();
			return {
				id: doc.id,
				userID,
				content,
				timeStamp: moment(timeStamp.toDate()).format('lll'),
			};
		});
		setPosts(arrayData);
		setIsLoading(false);
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

export const getUserProfile = async (id, setPostUser = undefined) => {
	try {
		const docRef = doc(dbProfilesRef, id);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			if (setPostUser) return setPostUser({ ...docSnap.data(), id });
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

export const getComments = async (postID, setCommentStatus) => {
	onSnapshot(
		query(
			dbCommentsRef,
			where('postID', '==', postID),
			orderBy('timeStamp', 'desc')
		),
		async (response) => {
			const arrayData = await Promise.all(
				response.docs.map(async (doc) => {
					const { postID, userID, comment, timeStamp } = doc.data();
					const { name, photo } = await getUserProfile(userID);
					return {
						id: doc.id,
						postID,
						user: {
							name,
							photo,
						},
						comment,
						timeStamp: moment(timeStamp.toDate()).format('lll'),
					};
				})
			);

			setCommentStatus({
				comments: arrayData,
				commentCount: arrayData.length,
			});
		}
	);
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

//* POST METHODS
export const createPost = async ({
	userID,
	content,
	setInputValue,
	setIsModalOpen,
	setIsValid,
}) => {
	const objectData = {
		userID,
		content,
		timeStamp: Timestamp.now(),
	};

	try {
		await addDoc(dbPostsRef, objectData);
		setInputValue('');
		setIsModalOpen(false);
		setIsValid(false);
		toast.success('Post created succesfully.', toastOptions);
	} catch (error) {
		console.log(error);
		toast.error('Something happened, could not create post.', toastOptions);
	}
};

export const createProfile = async ({
	name,
	email,
	photo = 'none',
	banner = 'none',
}) => {
	const profileObj = {
		name,
		email,
		photo,
		banner,
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

export const createComment = async (postID, userID, comment) => {
	try {
		await addDoc(dbCommentsRef, {
			postID,
			userID,
			comment,
			timeStamp: Timestamp.now(),
		});
		toast.success('Commented on this post, succesfully.', toastOptions);
	} catch (error) {
		toast.error(
			'Something happened, could not create comment.',
			toastOptions
		);
	}
};

//* PATCH METHODS
export const updateUserInformation = async (userID, objectData) => {
	try {
		const profileRef = doc(dbProfilesRef, userID);
		await updateDoc(profileRef, objectData);
		toast.success('Profile updated succesfully.', toastOptions);
	} catch (error) {
		toast.error(
			'Something happened, could not update user profile.',
			toastOptions
		);
	}
};

export const updatePostContent = async (postID, objectContent) => {
	try {
		const postRef = doc(dbPostsRef, postID);
		await updateDoc(postRef, objectContent);
		toast.success('Post content updated succesfully.', toastOptions);
	} catch (error) {
		toast.error(
			'Something happened, could not update post content.',
			toastOptions
		);
	}
};

//* DELETE METHODS
export const deletePost = async (postID, setConfirmLoading, onShowPopup) => {
	try {
		const postRef = doc(dbPostsRef, postID);
		await deleteDoc(postRef);
		setConfirmLoading(false);
		onShowPopup(false);
		toast.success('Post deleted succesfully.', toastOptions);
	} catch (error) {
		toast.error('Something happened, could not delete post.', toastOptions);
	}
};

//* POST-DELETE METHODS
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
