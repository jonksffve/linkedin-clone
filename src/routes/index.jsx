import { createBrowserRouter } from 'react-router-dom';
import LoginView from '../pages/LoginView';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <LoginView />,
	},
]);
