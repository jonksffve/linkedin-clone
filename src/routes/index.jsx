import { createBrowserRouter } from 'react-router-dom';
import MainLayout from './rootlayout';
import LoginView from '../pages/LoginView';
import RegisterView from '../pages/RegisterView';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout />,
		children: [
			{
				index: true,
				element: <LoginView />,
			},
			{
				path: '/register',
				element: <RegisterView />,
			},
		],
	},
]);
