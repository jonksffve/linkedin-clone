import { toast } from 'react-toastify';
import { toastOptions } from '../toastConfig';
import { auth } from '../firebaseConfig';
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
} from 'firebase/auth';
import { createProfile } from './FirestoreAPI';

export const LoginAPI = async (email, password) => {
	try {
		const response = await signInWithEmailAndPassword(
			auth,
			email,
			password
		);
		toast.success('Succesfully logged in', toastOptions);
		return response;
	} catch (error) {
		toast.error('Please check your credentials.', toastOptions);
	}
};

export const GoogleSignInAPI = async () => {
	try {
		const provider = new GoogleAuthProvider();
		const response = await signInWithPopup(auth, provider);
		toast.success('Succesfully logged in', toastOptions);
		return response;
	} catch (error) {
		toast.error('Something happened.', toastOptions);
	}
};

export const LogoutAPI = async () => {
	try {
		signOut(auth);
		toast.success('Succesfully logged out', toastOptions);
	} catch (error) {
		toast.error('Something happened.', toastOptions);
	}
};

export const RegisterAPI = async ({ name, email, password }) => {
	try {
		const response = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		const userObj = {
			name,
			email,
		};
		await createProfile(userObj);
		toast.success('Succesfully created account', toastOptions);
		return response;
	} catch (error) {
		toast.error('Cannot create your account', toastOptions);
	}
};
