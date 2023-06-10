import { createBrowserRouter } from 'react-router-dom';
import LoginView from '../pages/LoginView';

export const router = createBrowserRouter([
	{
		path: '/login',
		element: <LoginView />,
	},
]);
