import { storage } from '../firebaseConfig';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { updatePostContent, updateUserInformation } from './FirestoreAPI';

/**
 * Function that upload an image to firebase storage and then updates user profile (photo or banner) based on a type
 *
 * @param {string} userID, reference so we can know which profile to update
 * @param {string} file, file object to be uploaded to firebase
 * @param {string} type, define if we target a "photo" or "banner"
 * @param {function} setUploadProgress, keep track of the upload progress to be rendered in the modal
 * @param {function} setIsModalOpen, used to determine when we close the modal
 * @param {function} setCurrentImgs, sets the component's state
 * @param {function} setFileInput, resets the component's state
 * @param {function} setIsValid, resets the component's state
 */
export const uploadUserImage = (
	userID,
	file,
	type,
	setUploadProgress,
	setIsModalOpen,
	setCurrentImgs,
	setFileInput,
	setIsValid
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
				setIsValid({
					photo: false,
					banner: false,
				});
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

/**
 * Function that upload an image to firebase storage and then updates a post
 *
 * @param {string} postID, reference so we can know which post to update
 * @param {string} file, file object to be uploaded to firebase
 * @param {function} setUploadProgress, keep track of the upload progress to be rendered in the modal
 * @param {function} setPostImage, sets the component's state
 * @param {function} setIsValid, resets the component's state
 * @param {function} setIsModalOpen, used to determine when we close the modal
 */
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

	//Guard clause to upload a post with just CONTENT not image
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
