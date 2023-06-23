import { Fragment } from 'react';
import classes from '../modules/card.module.css';
import { BiEdit } from 'react-icons/bi';
import { BsFillCameraFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { ROUTE_EDIT } from '../../helpers/config';
import { useState } from 'react';
import { uploadUserImage } from '../../api/StorageAPI';
import EditModal from './UploadImageModal';

const ProfileHeader = ({ user, editable }) => {
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
		uploadUserImage(
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
		<Fragment>
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
					{editable && (
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
					)}
				</div>
				<div className={classes['image-container']}>
					<img
						className={`${classes['profile-img']} ${classes.large}`}
						src={currentImgs.photo ? currentImgs.photo : user.photo}
						alt=''
					/>
					{editable && (
						<BsFillCameraFill
							className={classes.link}
							onClick={() => {
								setIsModalOpen({
									...isModalOpen,
									photo: true,
								});
							}}
						/>
					)}
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
				{editable && (
					<div>
						<Link
							to={ROUTE_EDIT}
							className={classes.link}
						>
							<BiEdit size={25} />
						</Link>
					</div>
				)}
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
		</Fragment>
	);
};

export default ProfileHeader;
