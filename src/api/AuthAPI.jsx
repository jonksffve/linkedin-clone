import { toast } from 'react-toastify';
import { toastOptions } from '../toastConfig';
import { auth } from '../firebaseConfig';
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup,
} from 'firebase/auth';

export const LoginAPI = async (email, password) => {
	try {
		await signInWithEmailAndPassword(auth, email, password);
		toast.success('Succesfully logged-in', toastOptions);
	} catch (error) {
		toast.error('Please check your credentials.', toastOptions);
	}
};

export const RegisterAPI = async (email, password) => {
	try {
		await createUserWithEmailAndPassword(auth, email, password);
		toast.success('Succesfully created account', toastOptions);
	} catch (error) {
		toast.error('Cannot create your account', toastOptions);
	}
};

export const GoogleSignInAPI = async () => {
	try {
		const provider = new GoogleAuthProvider();
		await signInWithPopup(auth, provider);
		toast.success('Succesfully logged-in', toastOptions);
	} catch (error) {
		toast.error('Something happened.', toastOptions);
	}
};
