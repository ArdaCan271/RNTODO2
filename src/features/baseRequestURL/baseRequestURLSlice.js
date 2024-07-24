import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	value: '',
}

export const baseRequestURLSlice = createSlice({
	name: 'baseRequestURL',
	initialState,
	reducers: {
		setBaseRequestURL: (state, action) => {
			state.value = action.payload;
		},
	},
});

export const { setBaseRequestURL } = baseRequestURLSlice.actions;
export default baseRequestURLSlice.reducer;