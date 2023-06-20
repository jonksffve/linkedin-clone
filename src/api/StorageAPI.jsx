import { storage } from '../firebaseConfig';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { updateUserInformation } from './FirestoreAPI';

export const uploadImage = (
	userID,
	file,
	type,
	setUploadProgress,
	setIsModalOpen,
	setCurrentImgs,
	setFileInput
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
			setFileInput({});
			setUploadProgress(0);
			setIsModalOpen(false);
			setCurrentImgs((prevState) => {
				return {
					...prevState,
					...userObj,
				};
			});
		}
	);
};