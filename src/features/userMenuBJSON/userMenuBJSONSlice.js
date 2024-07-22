import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  menuBJSON: [],
  counter: 0,
};

export const userMenuBJSONSlice = createSlice({
  name: 'userMenuBJSON',
  initialState,
  reducers: {
    setMenuBJSON: (state, action) => {
      state.menuBJSON = action.payload;
    },
    addCounter: (state) => {
      state.counter += 1;
    }
  },
});

export const { setMenuBJSON, addCounter } = userMenuBJSONSlice.actions;

export default userMenuBJSONSlice.reducer;