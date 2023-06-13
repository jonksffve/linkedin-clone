import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user-slice';
import postsReducer from './posts-slice';

export const store = configureStore({
	reducer: {
		user: userReducer,
		posts: postsReducer,
	},
});
