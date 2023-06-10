import { auth } from '../firebaseConfig';
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
} from 'firebase/auth';

export const LoginAPI = async (email, password) => {
	return await signInWithEmailAndPassword(auth, email, password);
};

export const RegisterAPI = (email, password) => {
	return createUserWithEmailAndPassword(auth, email, password);
};
