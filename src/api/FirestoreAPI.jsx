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
} from 'firebase/firestore';
import moment from 'moment/moment';

const dbPostsRef = collection(firestore, 'posts');
const dbProfilesRef = collection(firestore, 'profiles');

export const createPost = async ({ user, content }) => {
	const objectData = {
		user: {
			id: user.id,
			name: user.name,
			photo: user.photo,
		},
		content,
		timeStamp: Timestamp.now(),
	};

	try {
		const response = await addDoc(dbPostsRef, objectData);
		toast.success('Post created succesfully.', toastOptions);
		return response.id;
	} catch (error) {
		console.log(error);
		toast.error('Something happened, could not create post.', toastOptions);
	}
};

export const getPost = async (id) => {
	try {
		const docRef = doc(dbPostsRef, id);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			const { user, content, timeStamp } = docSnap.data();
			return {
				id: docSnap.id,
				user,
				content,
				timeStamp: moment(timeStamp.toDate()).format('lll'),
			};
		}
		return new Error('Document does not exist.');
	} catch (error) {
		toast.error(
			'Something happened, could not retrieve post.',
			toastOptions
		);
	}
};

export const getPosts = async () => {
	const data = await getDocs(query(dbPostsRef, orderBy('timeStamp', 'desc')));
	const arrayData = data.docs.map((doc) => {
		const { user, content, timeStamp } = doc.data();
		return {
			id: doc.id,
			user,
			content,
			timeStamp: moment(timeStamp.toDate()).format('lll'),
		};
	});
	return arrayData;
};

export const createProfile = async ({ name, email, photo }) => {
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
