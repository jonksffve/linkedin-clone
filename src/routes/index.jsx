import { createBrowserRouter } from 'react-router-dom';
import MainLayout from './layouts/base';
import AccountLayout from './layouts/account';

import IndexView from '../pages/IndexView';
import HomeView from '../pages/HomeView';
import LoginView from '../pages/LoginView';
import RegisterView from '../pages/RegisterView';
import ProfileView from '../pages/ProfileView';

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
				path: '/account',
				element: <AccountLayout />,
				children: [
					{
						index: true,
						element: <HomeView />,
					},
					{
						path: 'profile',
						element: <ProfileView />,
					},
					{
						path: ':userId/edit',
						//edit page
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
