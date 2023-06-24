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

/**
 * Firebase AUTH helper function that let us authenticate (or not) users with email and password
 * Notifies the user with toasts (messages) the results of their actions
 *
 * @see https://firebase.google.com/docs/auth/web/password-auth
 * @param {string} email User provided email for auth
 * @param {string} password User provided password for auth
 * @return {response} Main information about the authenticated user
 */
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
		toast.error('Could not login, check credentials.', toastOptions);
	}
};

/**
 * Firebase AUTH helper function that let us authenticate (or not) users with Gmail account
 * Notifies the user with toasts (messages) the results of their actions
 *
 * @see https://firebase.google.com/docs/auth/web/google-signin
 * @return {response} Main information about the authenticated user
 */
export const GoogleSignInAPI = async () => {
	try {
		const provider = new GoogleAuthProvider();
		const response = await signInWithPopup(auth, provider);
		toast.success('Succesfully logged in', toastOptions);
		return response;
	} catch (error) {
		toast.error('Something happened. Could not login.', toastOptions);
	}
};

/**
 * Firebase AUTH helper function that let us log users out.
 * Notifies the user with toasts (messages) the results of their actions
 *
 * @see https://firebase.google.com/docs/auth/web/password-auth
 */
export const LogoutAPI = async () => {
	try {
		await signOut(auth);
		toast.success('Succesfully logged out', toastOptions);
	} catch (error) {
		toast.error('Something happened.', toastOptions);
	}
};

/**
 * Firebase AUTH helper function that let us create users with email and password
 * After we get a response from backend, we then create a profile for our app usage
 * Notifies the user with toasts (messages) the results of their actions
 *
 * @see https://firebase.google.com/docs/auth/web/password-auth
 * @param {string} name User provided name for auth
 * @param {string} email User provided email for auth
 * @param {string} password User provided password for auth
 * @return {response} Main information about the authenticated user (Automatically logs user in)
 */
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
