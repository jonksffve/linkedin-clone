import { createBrowserRouter } from 'react-router-dom';
import MainLayout from './layouts/base';
import AccountLayout from './layouts/account';

import IndexView from '../pages/IndexView';
import HomeView from '../pages/HomeView';
import LoginView from '../pages/LoginView';
import RegisterView from '../pages/RegisterView';
import UserProfileView from '../pages/UserProfileView';
import ProfileEditView from '../pages/ProfileEditView';
import ProfileView from '../pages/ProfileView';
import ConnectionsView from '../pages/ConnectionsView';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout />,
		children: [
			{
				index: true,
				element: <IndexView />,
			},
			{
				path: 'feed',
				element: <HomeView />,
			},
			{ path: 'connections', element: <ConnectionsView /> },
			{
				path: 'account',
				element: <AccountLayout />,
				children: [
					{
						index: true,
						element: <UserProfileView />,
					},
					{
						path: ':id',
						element: <ProfileView />,
					},
					{
						path: 'edit',
						element: <ProfileEditView />,
					},
					{
						path: 'register',
						element: <RegisterView />,
					},
					{
						path: 'login',
						element: <LoginView />,
					},
				],
			},
		],
	},
]);
