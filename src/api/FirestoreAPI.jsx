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
} from 'firebase/firestore';
import { getCurrentTime } from '../helpers/useMoment';

const dbPostsRef = collection(firestore, 'posts');
const dbProfilesRef = collection(firestore, 'profiles');

export const createPost = async ({ user, content }) => {
	const objectData = {
		user,
		content,
		timeStamp: getCurrentTime('lll'),
	};

	try {
		await addDoc(dbPostsRef, objectData);
		toast.promise('Post created succesfully.', toastOptions);
	} catch (error) {
		toast.error('Something happened, could not create post.', toastOptions);
	}
};

export const getPosts = async () => {
	const data = await getDocs(query(dbPostsRef, orderBy('timeStamp', 'desc')));
	const arrayData = data.docs.map((doc) => {
		return {
			...doc.data(),
			id: doc.id,
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
