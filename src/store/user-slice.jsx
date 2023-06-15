import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	name: null,
	email: null,
	photo: null,
	headline: null,
	location: null,
	company: null,
	collage: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUserLoginState: (state, action) => {
			const { name, email, photo, headline, location, company, collage } =
				action.payload;
			state.name = name;
			state.email = email;
			state.photo = photo;
			state.headline = headline;
			state.location = location;
			state.company = company;
			state.collage = collage;
		},
		setUserLogoutState: (state) => {
			state.name = null;
			state.email = null;
			state.photo = null;
			state.headline = null;
			state.location = null;
			state.company = null;
			state.collage = null;
		},
	},
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
