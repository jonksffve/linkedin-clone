import { toast } from 'react-toastify';
import { toastOptions } from '../toastConfig';
import { firestore } from '../firebaseConfig';
import {
	addDoc,
	collection,
	getDocs,
	orderBy,
	query,
} from 'firebase/firestore';
import { getCurrentTime } from '../helpers/useMoment';

const dbRef = collection(firestore, 'posts');

export const createPost = async ({ user, content }) => {
	//Object so we can add images, documents, etc. (not just text)
	const objectData = {
		user,
		content,
		timeStamp: getCurrentTime('lll'),
	};

	try {
		await addDoc(dbRef, objectData);
		toast.success('Post created succesfully.', toastOptions);
	} catch (error) {
		toast.error('Something happened, could not create post.', toastOptions);
	}
};

export const getPosts = async () => {
	//const data = await getDocs(dbRef).orderBy('timeStamp', 'desc');
	const data = await getDocs(query(dbRef, orderBy('timeStamp', 'desc')));
	const arrayData = data.docs.map((doc) => {
		return {
			...doc.data(),
			id: doc.id,
		};
	});
	return arrayData;
};
