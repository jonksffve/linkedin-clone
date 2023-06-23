import { storage } from '../firebaseConfig';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { updatePostContent, updateUserInformation } from './FirestoreAPI';

export const uploadUserImage = (
	userID,
	file,
	type,
	setUploadProgress,
	setIsModalOpen,
	setCurrentImgs,
	setFileInput
) => {
	const storageRef = ref(storage, `users/imgs/${file.name}`);
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
		() => {
			getDownloadURL(uploadTask.snapshot.ref).then(async (imgURL) => {
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
			});
		}
	);
};

export const uploadPostImage = (
	postID,
	file,
	setUploadProgress,
	setPostImage,
	setIsValid,
	setIsModalOpen
) => {
	const storageRef = ref(storage, `posts/imgs/${file.name}`);
	const uploadTask = uploadBytesResumable(storageRef, file);

	if (!file) {
		setIsValid(false);
		setIsModalOpen(false);
		return;
	}

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
		() => {
			getDownloadURL(uploadTask.snapshot.ref).then(
				async (downloadURL) => {
					const postObj = {
						image: downloadURL,
					};
					await updatePostContent(postID, postObj);
					setPostImage('');
					setUploadProgress(0);
					setIsValid(false);
					setIsModalOpen(false);
				}
			);
		}
	);
};
