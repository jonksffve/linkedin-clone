import { createBrowserRouter } from 'react-router-dom';
import MainLayout from './rootlayout';
import IndexView from '../pages/IndexView';
import HomeView from '../pages/HomeView';
import LoginView from '../pages/LoginView';
import RegisterView from '../pages/RegisterView';

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
						path: ':userId/edit',
						//edit page
					},
					{
						path: '/register',
						element: <RegisterView />,
					},
					{
						path: '/login',
						element: <LoginView />,
					},
				],
			},
		],
	},
]);
