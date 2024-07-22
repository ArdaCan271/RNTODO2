import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: {},
};

export const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setUserData } = userDataSlice.actions;

export default userDataSlice.reducer;