import classes from './modules/card.module.css';
import { useAuthState } from '../hooks/use-AuthStatus';
import Card from './UI/Card';
import { useSelector } from 'react-redux';
import { BiEdit } from 'react-icons/bi';
import { BsFillCameraFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { ROUTE_EDIT } from '../helpers/config';
import { useState } from 'react';
import { uploadImage } from '../api/StorageAPI';
import EditModal from './Profile/UploadImageModal';

const UserProfileComponent = () => {
	useAuthState();
	const user = useSelector((state) => state.user);
	const [isModalOpen, setIsModalOpen] = useState({
		photo: false,
		banner: false,
	});
	const [isValid, setIsValid] = useState({
		photo: false,
		banner: false,
	});
	const [fileInput, setFileInput] = useState({});
	const [uploadProgress, setUploadProgress] = useState(0);
	const [currentImgs, setCurrentImgs] = useState({});

	const handleOk = (type) => {
		uploadImage(
			user.id,
			fileInput,
			type,
			setUploadProgress,
			setIsModalOpen,
			setCurrentImgs,
			setFileInput
		);
	};

	return (
		<Card customClass={classes.profile}>
			<div className={classes['profile-header']}>
				<div className={classes['image-container']}>
					<img
						className={classes.banner}
						src={
							currentImgs.banner
								? currentImgs.banner
								: user.banner
						}
						alt=''
					/>
					<button
						onClick={() => {
							setIsModalOpen({
								...isModalOpen,
								banner: true,
							});
						}}
					>
						Editar foto de portada
					</button>
				</div>
				<div className={classes['image-container']}>
					<img
						className={`${classes['profile-img']} ${classes.large}`}
						src={currentImgs.photo ? currentImgs.photo : user.photo}
						alt=''
					/>
					<BsFillCameraFill
						className={classes.link}
						onClick={() => {
							setIsModalOpen({
								...isModalOpen,
								photo: true,
							});
						}}
					/>
				</div>
			</div>
			<div className={classes['profile-body']}>
				<div>
					<p className={classes.name}>{user.name}</p>
					<p className={classes.headline}>
						{user.headline
							? user.headline
							: 'No headline has been set'}
					</p>
					<p className={classes.location}>
						{user.location
							? user.location
							: 'No location has been set'}
					</p>
				</div>
				<div>
					<p className={classes.company}>
						{user.company
							? user.company
							: 'No company has been set'}
					</p>
					<p className={classes.college}>
						{user.college
							? user.college
							: 'No college has been set'}
					</p>
				</div>
				<div>
					<Link
						to={ROUTE_EDIT}
						className={classes.link}
					>
						<BiEdit size={25} />
					</Link>
				</div>
			</div>
			<EditModal
				type='photo'
				title='Upload profile image'
				open={isModalOpen.photo}
				onOk={() => {
					handleOk('photo');
				}}
				onCancel={() => {
					setIsModalOpen({
						...isModalOpen,
						photo: false,
					});
				}}
				valid={isValid.photo}
				action='Update'
				setIsValid={setIsValid}
				setFileInput={setFileInput}
				progress={uploadProgress}
			/>
			<EditModal
				type={'banner'}
				title='Upload banner image'
				open={isModalOpen.banner}
				onOk={() => {
					handleOk('banner');
				}}
				onCancel={() => {
					setIsModalOpen({
						...isModalOpen,
						banner: false,
					});
				}}
				valid={isValid.banner}
				action='Update'
				setIsValid={setIsValid}
				setFileInput={setFileInput}
				progress={uploadProgress}
			/>
		</Card>
	);
};

export default UserProfileComponent;
