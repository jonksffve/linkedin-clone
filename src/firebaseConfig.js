// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

/**
 * Main configuration to our backend provided by firebase.
 * Returns the different applications we are using in our project
 *
 *
 * @see https://firebase.google.com/docs/web/setup#available-libraries
 * @return {app} Main firebase APP that connects to the rest of services.
 * @return {auth} Authentication services for our project
 * @return {firestore} Database services for our project
 * @return {storage} File upload service for our project
 */

const firebaseConfig = {
	apiKey: 'AIzaSyD1T9QDlrKMLbuFOgcbzWiwjlqAmflxxZU',
	authDomain: 'linkedin-clone-cb242.firebaseapp.com',
	projectId: 'linkedin-clone-cb242',
	storageBucket: 'linkedin-clone-cb242.appspot.com',
	messagingSenderId: '740753669522',
	appId: '1:740753669522:web:32c91dc92145e2c939554b',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };
