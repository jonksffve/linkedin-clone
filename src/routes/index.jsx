import { createBrowserRouter } from 'react-router-dom';
import MainLayout from './rootlayout';
import LoginView from '../pages/LoginView';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout />,
		children: [
			{
				index: true,
				element: <LoginView />,
			},
		],
	},
]);
