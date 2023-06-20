import classes from './modules/card.module.css';
import { useAuthState } from '../hooks/use-AuthStatus';
import Card from './UI/Card';
import Modal from './UI/Modal';
import { useSelector } from 'react-redux';
import BannerBg from '../assets/images/banner.jfif';
import { BiEdit } from 'react-icons/bi';
import { BsFillCameraFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { ROUTE_EDIT } from '../helpers/config';
import { useEffect, useState } from 'react';
import { Progress } from 'antd';
import { uploadImage } from '../api/StorageAPI';

const UserProfileComponent = () => {
	useAuthState();
	const user = useSelector((state) => state.user);
	const [isModalOpen, setIsModalOpen] = useState({
		profileImage: false,
		bannerImage: false,
	});
	const [isValid, setIsValid] = useState({
		profileImage: false,
		bannerImage: false,
	});
	const [fileInput, setFileInput] = useState({});
	const [uploadProgress, setUploadProgress] = useState(0);

	const handleOk = (type) => {
		uploadImage(
			fileInput,
			setUploadProgress,
			setIsModalOpen,
			user.id,
			type
		);
	};

	console.log(user);

	return (
		<Card customClass={classes.profile}>
			<div className={classes['profile-header']}>
				<div className={classes['image-container']}>
					<img
						className={classes.banner}
						src={user.banner}
						alt=''
					/>
					<button
						onClick={() => {
							setIsModalOpen({
								...isModalOpen,
								bannerImage: true,
							});
						}}
					>
						Editar foto de portada
					</button>
				</div>
				<div className={classes['image-container']}>
					<img
						className={`${classes['profile-img']} ${classes.large}`}
						src={user.photo}
						alt=''
					/>
					<BsFillCameraFill
						className={classes.link}
						onClick={() => {
							setIsModalOpen({
								...isModalOpen,
								profileImage: true,
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
			<Modal
				title='Upload profile image'
				open={isModalOpen.profileImage}
				onOk={() => {
					handleOk('photo');
				}}
				onCancel={() => {
					setIsModalOpen({
						...isModalOpen,
						profileImage: false,
					});
				}}
				valid={isValid.profileImage}
				action='Update'
				mask={true}
			>
				<form
					className={classes.form}
					onSubmit={(event) => {
						event.preventDefault();
					}}
				>
					<input
						type='file'
						onChange={(event) => {
							setIsValid({
								...isValid,
								profileImage: event.target.value !== '',
							});
						}}
					/>
					<Progress
						type='circle'
						percent={uploadProgress}
						size={20}
					/>
				</form>
			</Modal>
			<Modal
				title='Upload banner image'
				open={isModalOpen.bannerImage}
				onOk={() => {
					handleOk('banner');
				}}
				onCancel={() => {
					setIsModalOpen({
						...isModalOpen,
						bannerImage: false,
					});
				}}
				valid={isValid.bannerImage}
				action='Update'
				mask={true}
			>
				<form
					className={classes.form}
					onSubmit={(event) => {
						event.preventDefault();
					}}
				>
					<input
						type='file'
						onChange={(event) => {
							setIsValid({
								...isValid,
								bannerImage: event.target.value !== '',
							});
							setFileInput(event.target.files[0]);
						}}
					/>
					<Progress
						type='circle'
						percent={uploadProgress}
						size={20}
					/>
				</form>
			</Modal>
		</Card>
	);
};

export default UserProfileComponent;
