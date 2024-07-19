import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  password: '',
};

export const loginDataSlice = createSlice({
  name: 'loginData',
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email += action.payload
    },
    setPassword: (state, action) => {
      state.password += action.payload
    },
  },
});

export const { setEmail, setPassword } = loginDataSlice.actions;

export default loginDataSlice.reducer;