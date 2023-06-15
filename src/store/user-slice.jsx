import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	name: undefined,
	email: undefined,
	photo: undefined,
	headline: undefined,
	location: undefined,
	company: undefined,
	collage: undefined,
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
			state.name = undefined;
			state.email = undefined;
			state.photo = undefined;
			state.headline = undefined;
			state.location = undefined;
			state.company = undefined;
			state.collage = undefined;
		},
	},
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
