import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	posts: [],
};

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		addPosts: (state, action) => {
			state.posts = [...action.payload.posts];
		},
		addNewPost: (state, action) => {
			state.posts.push(action.payload.post);
		},
	},
});

export const postsActions = postsSlice.actions;
export default postsSlice.reducer;
