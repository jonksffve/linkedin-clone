// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyD1T9QDlrKMLbuFOgcbzWiwjlqAmflxxZU',
	authDomain: 'linkedin-clone-cb242.firebaseapp.com',
	projectId: 'linkedin-clone-cb242',
	storageBucket: 'linkedin-clone-cb242.appspot.com',
	messagingSenderId: '740753669522',
	appId: '1:740753669522:web:32c91dc92145e2c939554b',
};

//Initialize Firebase
const app = initializeApp(firebaseConfig);
//authentication helper
const auth = getAuth(app);
//database connection helper
const firestore = getFirestore(app);
//storage helper
const storage = getStorage(app);

export { app, auth, firestore, storage };
