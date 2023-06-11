import { createBrowserRouter } from 'react-router-dom';
import MainLayout from './rootlayout';
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
				element: <HomeView />,
			},
			{
				path: '/home',
				element: <HomeView />,
			},
			{
				path: '/login',
				element: <LoginView />,
			},
			{
				path: '/register',
				element: <RegisterView />,
			},
		],
	},
]);