import classes from '../../modules/navbar.module.css';
import { AiOutlineClose } from 'react-icons/ai';

const MenuSearch = ({ onClose }) => {
	return (
		<form className={classes['search-form']}>
			<input
				type='text'
				name='search'
				id='search'
				placeholder='Search an user'
			/>
			<AiOutlineClose
				size={20}
				onClick={() => {
					onClose(false);
				}}
			/>
		</form>
	);
};

export default MenuSearch;
