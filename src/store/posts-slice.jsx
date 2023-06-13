import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	posts: [],
};

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		addPost: (state, payload) => {
			state.posts.push(payload.post);
		},
	},
});

export const postsActions = postsSlice.actions;
export default postsSlice.reducer;
