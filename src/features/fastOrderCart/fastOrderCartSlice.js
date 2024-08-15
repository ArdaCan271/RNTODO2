import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userList: [],
};

export const fastOrderCartSlice = createSlice({
  name: 'fastOrderCart',
  initialState,
  reducers: {
    addOneOfProduct: (state, action) => {
      const { userEmail, stockCode, stockPrice } = action.payload;
      let user = state.userList.find((user) => user.userEmail === userEmail);

      if (!user) {
        user = { userEmail, productsList: [] };
        state.userList.push(user);
      }

      const product = user.productsList.find((product) => product.stockCode === stockCode);

      if (product) {
        product.quantity += 1;
      } else {
        user.productsList.push({ stockCode, stockPrice, quantity: 1 });
      }
    },
    removeOneOfProduct: (state, action) => {
      const { userEmail, stockCode } = action.payload;
      const user = state.userList.find((user) => user.userEmail === userEmail);

      if (user) {
        const product = user.productsList.find((product) => product.stockCode === stockCode);

        if (product) {
          product.quantity -= 1;

          if (product.quantity === 0) {
            user.productsList = user.productsList.filter((product) => product.stockCode !== stockCode);
          }

          if (user.productsList.length === 0) {
            state.userList = state.userList.filter((u) => u.userEmail !== userEmail);
          }
        }
      }
    },
    setAmountOfProduct: (state, action) => {
      const { userEmail, stockCode, quantity } = action.payload;
      let user = state.userList.find((user) => user.userEmail === userEmail);

      if (!user) {
        user = { userEmail, productsList: [] };
        state.userList.push(user);
      }

      const product = user.productsList.find((product) => product.stockCode === stockCode);

      if (product) {
        product.quantity = quantity;

        if (quantity === 0) {
          user.productsList = user.productsList.filter((product) => product.stockCode !== stockCode);
        }

        if (user.productsList.length === 0) {
          state.userList = state.userList.filter((u) => u.userEmail !== userEmail);
        }
      } else {
        user.productsList.push({ ...action.payload });
      }
    },
    setPriceOfProduct: (state, action) => {
      const { userEmail, stockCode, stockPrice } = action.payload;
      const user = state.userList.find((user) => user.userEmail === userEmail);

      if (user) {
        const product = user.productsList.find((product) => product.stockCode === stockCode);

        if (product) {
          product.stockPrice = stockPrice;
        }
      }
    },
    clearCart: (state) => {
      state.userList = [];
    },
  },
});

export const { addOneOfProduct, removeOneOfProduct, setAmountOfProduct, setPriceOfProduct, clearCart } = fastOrderCartSlice.actions;

export default fastOrderCartSlice.reducer;
