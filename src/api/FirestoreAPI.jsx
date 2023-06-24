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
import { DEFAULT_BANNER, DEFAULT_PHOTO } from '../helpers/config';

//? REFERENCES TO COLLECTIONS IN FIREBASE
const dbPostsRef = collection(firestore, 'posts');
const dbProfilesRef = collection(firestore, 'profiles');
const dbLikesRef = collection(firestore, 'likes');
const dbCommentsRef = collection(firestore, 'comments');
const dbConnectionsRef = collection(firestore, 'connections');

//* GET METHODS
/**
 * Fetches all users from the backend and then, with the data
 * sets the component's state
 *
 * @param {function} setUsers Sets the component's state with the users data
 */
export const getAllUsers = async (setUsers) => {
	const response = await getDocs(dbProfilesRef);
	const arrayData = response.docs.map((doc) => {
		return {
			...doc.data(),
			id: doc.id,
		};
	});
	setUsers(arrayData);
};

/**
 * Fetches all posts from the backend and then, with the data
 * sets the component's state
 *
 * @param {function} setPosts Sets the component's state with the posts data
 * @param {function} setIsLoading Sets the component's state to render or not spinner
 */
export const getPosts = async (setPosts, setIsLoading) => {
	onSnapshot(query(dbPostsRef, orderBy('timeStamp', 'desc')), (response) => {
		const arrayData = response.docs.map((doc) => {
			const { userID, content, timeStamp, image } = doc.data();
			return {
				id: doc.id,
				image,
				userID,
				content,
				timeStamp: moment(timeStamp.toDate()).format('lll'),
			};
		});
		setPosts(arrayData);
		setIsLoading(false);
	});
};

/**
 * Fetches all LIKES from a given POST, then sets the component's state
 *
 * @param {string} postID identification of the desired post
 * @param {string} userID identification of the logged in user
 * @param {function} setLikeStatus Sets the components state of how many likes the post have, and also if the current
 * logged in user has liked it or not.
 */
export const getLikes = async (postID, userID, setLikeStatus) => {
	onSnapshot(query(dbLikesRef, where('postID', '==', postID)), (response) => {
		const arrayData = response.docs.map((doc) => doc.data());
		setLikeStatus({
			likesCount: arrayData?.length,
			isLikedByUser: arrayData.some((el) => el.userID === userID),
		});
	});
};

/**
 * Get a particular user profile if exists.
 *
 * @param {string} id identification of the desired profile
 * @param {function} setPostUser *OPTIONAL* If given sets the components status to track post creator
 * @returns {object} if not setPostUser is given, refer to ---CUSTOM HOOK: useAuthStatus!!---
 */
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

/**
 * Get all comments collection data ordered by publication date
 *
 * @param {string} postID identification of the target post
 * @param {function} setCommentStatus Sets component's state with array data and the comment's count
 * @returns {object} if not setPostUser is given, refer to ---CUSTOM HOOK: useAuthStatus!!---
 */
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

/**
 * Gets an user ID given its email (if found)
 *
 * @param {string} email unique way to retrieve an user from database
 * @returns {object} with the found id or undefined if not found
 */
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

/**
 * Gets all the connections a user has
 *
 * @param {string} userID, to identify user to be queried
 * @param {string} targetID, way to check if user is connected to another
 * @param {function} setIsConnected, updates component's status with a boolean
 */
export const getConnections = async (userID, targetID, setIsConnected) => {
	onSnapshot(
		query(dbConnectionsRef, where('userID', '==', userID)),
		(response) => {
			const arrayData = response.docs.map((doc) => doc.data());
			setIsConnected(
				arrayData.some((item) => item.targetID === targetID)
			);
		}
	);
};

//* POST METHODS
/**
 * Creates a post in the backend
 *
 * @param {string} userID, to identify user that made the post
 * @param {string} content, body of the post
 * @param {function} setPostContent, resets component's content data to default
 * @returns {string} newly created document ID
 */
export const createPost = async ({ userID, content, setPostContent }) => {
	const objectData = {
		userID,
		content,
		timeStamp: Timestamp.now(),
	};

	try {
		const postRef = await addDoc(dbPostsRef, objectData);
		toast.success('Post created succesfully.', toastOptions);
		setPostContent('');
		return postRef.id;
	} catch (error) {
		toast.error('Something happened, could not create post.', toastOptions);
	}
};

/**
 * Creates a profile with the authenticated user
 *
 * @param {string} name, given name to the user
 * @param {string} email, unique identifier per user
 * @param {string} photo, URL to the default photo for newly created profiles
 * @param {string} banner, URL to the default banner for newly created profiles
 */
export const createProfile = async ({
	name,
	email,
	photo = DEFAULT_PHOTO,
	banner = DEFAULT_BANNER,
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

		//Guard clause, avoid creating multiple profiles to same user!
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

/**
 * Creates a comment on a particular post
 *
 * @param {string} postID, target post to be commented on
 * @param {string} userID, ID of the user that creates the comment
 * @param {string} comment, comment data itself
 * @param {function} setComment, resets component's comment state to its default
 */
export const createComment = async (postID, userID, comment, setComment) => {
	try {
		await addDoc(dbCommentsRef, {
			postID,
			userID,
			comment,
			timeStamp: Timestamp.now(),
		});
		setComment('');
		toast.success('Commented posted.', toastOptions);
	} catch (error) {
		toast.error(
			'Something happened, could not create comment.',
			toastOptions
		);
	}
};

//* PATCH METHODS
/**
 * Function that retrieves a profile document and then updates its content
 *
 * @param {string} userID, ID of the target profile to be updated
 * @param {object} objectData, user data to be updated
 */
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

/**
 * Function that retrieves a post document and then updates its content
 *
 * @param {string} postID, ID of the target post to be updated
 * @param {object} objectContent, post data content to be updated
 */
export const updatePostContent = async (postID, objectContent) => {
	try {
		const postRef = doc(dbPostsRef, postID);
		await updateDoc(postRef, objectContent);
		toast.success('Post content updated succesfully.', toastOptions);
	} catch (error) {
		console.log(error);
		toast.error(
			'Something happened, could not update post content.',
			toastOptions
		);
	}
};

//* DELETE METHODS
/**
 * Function that deletes a post by its ID, showing a confirmation before deleting
 *
 * @param {string} postID, ID of the target post to be deleted
 * @param {function} setConfirmLoading, resets confirmation status to its default
 * @param {function} onShowPopup, resets confirmation status to its default
 */
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
/**
 * Function that CREATES/DELETES a LIKE on a post, depending on it status
 *
 * @param {string} postID, ID of the target post
 * @param {string} userID, ID of the target user
 * @param {boolean} isLiked, to determine if we create or delete a LIKE
 */
export const likePost = async (postID, userID, isLiked) => {
	try {
		//We create a document ID merging post-user, so we ensure 1 like per post per user
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

/**
 * Function that CREATES/DELETES a CONNECTION between users, depending on it status
 *
 * @param {string} userID, ID of the connected user
 * @param {string} targetID, ID of the target user
 * @param {boolean} isConnected, to determine if we create or delete a CONNECTION
 */
export const createConnection = async (userID, targetID, isConnected) => {
	try {
		//We create a unique ID merging userid - targetid
		const connectionRef = doc(dbConnectionsRef, `${userID}_${targetID}`);
		if (isConnected) {
			await deleteDoc(connectionRef);
		} else {
			await setDoc(connectionRef, {
				userID,
				targetID,
			});
		}
	} catch (error) {
		toast.error(
			'Something happened, could not connect to user.',
			toastOptions
		);
	}
};
