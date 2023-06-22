import { Popover } from 'antd';
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import classes from '../../modules/navbar.module.css';
import { ROUTE_PROFILE } from '../../../helpers/config';
import { Spin } from 'antd';

const SearchPopover = ({ open, title, onClose, users, searching }) => {
	const content = searching ? (
		<div className={classes['search-popover']}>
			<Spin />
		</div>
	) : (
		<div className={classes['search-popover']}>
			<AiOutlineClose
				size={20}
				onClick={() => {
					onClose(false);
				}}
			/>

			{users.length > 0 ? (
				users.map((user) => {
					return (
						<div key={user.id}>
							<Link
								className={classes['submenu-item']}
								to={`${ROUTE_PROFILE}/${user.id}`}
							>
								<img
									src={user.photo}
									className={classes['profile-img']}
									alt=''
								/>
								<h2>{user.name}</h2>
							</Link>
						</div>
					);
				})
			) : (
				<h2>No users found</h2>
			)}
		</div>
	);

	return (
		<Popover
			content={content}
			title={title}
			open={open}
		/>
	);
};

export default SearchPopover;
