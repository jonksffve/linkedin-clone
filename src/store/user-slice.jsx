import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	id: undefined,
	name: undefined,
	email: undefined,
	photo: undefined,
	headline: undefined,
	location: undefined,
	company: undefined,
	college: undefined,
	banner: undefined,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUserLoginState: (state, action) => {
			const {
				id,
				name,
				email,
				photo,
				headline,
				location,
				company,
				college,
				banner,
			} = action.payload;
			state.id = id;
			state.name = name;
			state.email = email;
			state.photo = photo;
			state.headline = headline;
			state.location = location;
			state.company = company;
			state.college = college;
			state.banner = banner;
		},
		setUserLogoutState: (state) => {
			state.id = undefined;
			state.name = undefined;
			state.email = undefined;
			state.photo = undefined;
			state.headline = undefined;
			state.location = undefined;
			state.company = undefined;
			state.college = undefined;
			state.banner = undefined;
		},
	},
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
