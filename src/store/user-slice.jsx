import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	name: null,
	email: null,
	photo: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUserLoginState: (state, action) => {
			const { name, email, photo } = action.payload;
			console.log(action.payload);
			state.name = name;
			state.email = email;
			state.photo = photo;
		},
		setUserLogoutState: (state) => {
			state.name = null;
			state.email = null;
			state.photo = null;
		},
	},
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
