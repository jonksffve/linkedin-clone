import { Fragment } from 'react';
import { Outlet } from 'react-router';

const AccountLayout = () => {
	return (
		<Fragment>
			<Outlet />
		</Fragment>
	);
};

export default AccountLayout;
