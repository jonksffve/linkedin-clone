import { createBrowserRouter } from 'react-router-dom';
import MainLayout from './layouts/base';
import AccountLayout from './layouts/account';

import IndexView from '../pages/IndexView';
import HomeView from '../pages/HomeView';
import LoginView from '../pages/LoginView';
import RegisterView from '../pages/RegisterView';
import ProfileView from '../pages/ProfileView';
import ProfileEditView from '../pages/ProfileEditView';

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
			{
				path: 'account',
				element: <AccountLayout />,
				children: [
					{
						index: true,
						element: <ProfileView />,
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
