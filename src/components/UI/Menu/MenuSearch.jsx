import { useState, useEffect } from 'react';
import classes from '../../modules/navbar.module.css';
import { AiOutlineClose } from 'react-icons/ai';
import { getAllUsers } from '../../../api/FirestoreAPI';
import SearchPopover from './SearchPopover';

const MenuSearch = ({ onClose }) => {
	const [userList, setUserList] = useState([]);
	const [filteredUsers, setFilteredUsers] = useState([]);
	const [searchInput, setSearchInput] = useState('');
	const [isValid, setIsValid] = useState(false);
	const [searching, setSearching] = useState(true);

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			if (searchInput.trim() === '') return;

			if (userList.length > 0) {
				const newData = userList.filter((user) =>
					user.name.toLowerCase().includes(searchInput)
				);
				setFilteredUsers(newData);
			}
			setSearching(false);
		}, 1000);

		return () => {
			setSearching(true);
			clearTimeout(delayDebounceFn);
		};
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
					onFocus={(event) => {
						setIsValid(event.target.value.trim().length > 0);
					}}
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
				<SearchPopover
					onClose={setIsValid}
					open={isValid}
					title='Search results'
					users={filteredUsers}
					searching={searching}
				/>
			)}
		</div>
	);
};

export default MenuSearch;
