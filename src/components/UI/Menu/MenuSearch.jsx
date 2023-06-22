import { useState, useEffect } from 'react';
import classes from '../../modules/navbar.module.css';
import { AiOutlineClose } from 'react-icons/ai';
import { getAllUsers } from '../../../api/FirestoreAPI';

const MenuSearch = ({ onClose }) => {
	const [userList, setUserList] = useState([]);
	const [filteredUsers, setFilteredUsers] = useState([]);
	const [searchInput, setSearchInput] = useState('');
	const [isValid, setIsValid] = useState(false);

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			if (searchInput.trim() === '') return;

			if (userList.length > 0) {
				const newData = userList.filter((user) =>
					user.name.toLowerCase().includes(searchInput)
				);
				setFilteredUsers(newData);
			}
		}, 1500);

		return () => clearTimeout(delayDebounceFn);
	}, [searchInput, userList.length, userList]);

	useEffect(() => {
		getAllUsers(setUserList);
	}, []);

	return (
		<div className={classes['search-wrapper']}>
			<form className={classes['search-form']}>
				<input
					autoComplete='off'
					type='text'
					name='search'
					id='search'
					placeholder='Search an user'
					value={searchInput}
					onChange={(event) => {
						setSearchInput(event.target.value.trimStart());
						setIsValid(event.target.value.trim().length > 0);
					}}
				/>
				<AiOutlineClose
					size={20}
					onClick={() => {
						onClose(false);
					}}
				/>
			</form>
			{isValid && (
				<div className={classes['search-popmenu']}>
					{filteredUsers.map((user) => {
						return (
							<div key={user.id}>
								<img
									className={classes['profile-img']}
									src={user.photo}
									alt=''
								/>
								<h3>{user.name}</h3>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default MenuSearch;
