import { toast } from 'react-toastify';
import { toastOptions } from '../toastConfig';
import { firestore } from '../firebaseConfig';
import { addDoc, collection, getDocs } from 'firebase/firestore';

const dbRef = collection(firestore, 'posts');

export const createPost = async (data) => {
	//Object so we can add images, documents, etc. (not just text)
	const objectData = {
		content: data,
	};

	try {
		await addDoc(dbRef, objectData);
		toast.success('Post created succesfully.', toastOptions);
	} catch (error) {
		toast.error('Something happened, could not create post.', toastOptions);
	}
};

export const getPosts = async () => {
	const data = await getDocs(dbRef);
	const arrayData = data.docs.map((doc) => {
		return {
			...doc.data(),
			id: doc.id,
		};
	});
	return arrayData;
};
