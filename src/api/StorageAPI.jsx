import { storage } from '../firebaseConfig';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { updateUserInformation } from './FirestoreAPI';

export const uploadImage = (
	file,
	setUploadProgress,
	setIsModalOpen,
	userID,
	type
) => {
	const storageRef = ref(storage, `images/${file.name}`);
	const uploadTask = uploadBytesResumable(storageRef, file);

	uploadTask.on(
		'state_changed',
		(snapshot) => {
			const progress = Math.round(
				(snapshot.bytesTransferred / snapshot.totalBytes) * 100
			);
			setUploadProgress(progress);
		},
		(error) => {
			console.error(error);
		},
		async () => {
			const imgURL = await getDownloadURL(uploadTask.snapshot.ref);
			const userObj = {
				[type]: imgURL,
			};
			await updateUserInformation(userID, userObj);
			console.log(imgURL);
			setIsModalOpen(false);
		}
	);
};
