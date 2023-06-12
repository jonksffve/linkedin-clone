import { firestore } from '../firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';

const dbRef = collection(firestore, 'posts');

export const CreatePostAPI = async (data) => {
	return await addDoc(dbRef, data);
};
