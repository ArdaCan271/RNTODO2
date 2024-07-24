import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	value: 'light',
}

export const themeSlice = createSlice({
	name: 'themeData',
	initialState,
	reducers: {
		changeTheme: (state) => {
			state.value = state.value === 'light' ? 'dark' : 'light';
		},
		setLightTheme: (state) => {
			state.value = 'light';
		},

		setDarkTheme: (state) => {
			state.value = 'dark';
		},
	},
});

export const { changeTheme, setLightTheme, setDarkTheme } = themeSlice.actions;
export default themeSlice.reducer;