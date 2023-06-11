import { auth } from '../firebaseConfig';
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup,
} from 'firebase/auth';

export const LoginAPI = async (email, password) => {
	return await signInWithEmailAndPassword(auth, email, password);
};

export const RegisterAPI = async (email, password) => {
	return await createUserWithEmailAndPassword(auth, email, password);
};

export const GoogleSignInAPI = async () => {
	const provider = new GoogleAuthProvider();
	return await signInWithPopup(auth, provider);
};
