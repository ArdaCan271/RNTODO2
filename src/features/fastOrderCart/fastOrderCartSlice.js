import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userList: [],
};

export const fastOrderCartSlice = createSlice({
  name: 'fastOrderCart',
  initialState,
  reducers: {
    addOneOfProduct: (state, action) => {
      const { userEmail, stockName, stockCode, stockPrice, unitPrice, unitType, discounts } = action.payload;
      let user = state.userList.find((user) => user.userEmail === userEmail);

      if (!user) {
        user = { userEmail, productsList: [] };
        state.userList.push(user);
      }

      const product = user.productsList.find((product) => product.stockCode === stockCode);

      if (product) {
        product.quantity += 1;
        product.stockName = stockName; // Update stockName
        product.stockPrice = stockPrice; // Update stockPrice
        product.unitPrice = unitPrice; // Update unitPrice
        product.unitType = unitType; // Update unitType
        product.discounts = discounts;  // Update discounts
      } else {
        user.productsList.push({ stockName, stockCode, stockPrice, unitPrice, unitType, discounts, quantity: 1 });
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
      const { userEmail, stockName, stockCode, quantity, stockPrice, unitPrice, unitType, discounts } = action.payload;
      let user = state.userList.find((user) => user.userEmail === userEmail);

      if (!user) {
        user = { userEmail, productsList: [] };
        state.userList.push(user);
      }

      const product = user.productsList.find((product) => product.stockCode === stockCode);

      if (product) {
        product.quantity = quantity;
        product.stockName = stockName; // Update stockName
        product.stockPrice = stockPrice; // Update stockPrice
        product.unitPrice = unitPrice; // Update unitPrice
        product.unitType = unitType; // Update unitType
        product.discounts = discounts;  // Update discounts

        if (quantity === 0) {
          user.productsList = user.productsList.filter((product) => product.stockCode !== stockCode);
        }

        if (user.productsList.length === 0) {
          state.userList = state.userList.filter((u) => u.userEmail !== userEmail);
        }
      } else {
        user.productsList.push({ stockName, stockCode, stockPrice, unitPrice, unitType, discounts, quantity });
      }
    },
    setPriceOfProduct: (state, action) => {
      const { userEmail, stockCode, unitPrice } = action.payload;
      const user = state.userList.find((user) => user.userEmail === userEmail);

      if (user) {
        const product = user.productsList.find((product) => product.stockCode === stockCode);

        if (product) {
          product.unitPrice = unitPrice; // Update unitPrice
        }
      }
    },
    setDiscountsOfProduct: (state, action) => {
      const { userEmail, stockCode, discounts } = action.payload;
      const user = state.userList.find((user) => user.userEmail === userEmail);

      if (user) {
        const product = user.productsList.find((product) => product.stockCode === stockCode);

        if (product) {
          product.discounts = discounts;
        }
      }
    },
    clearCart: (state, action) => {
      const userEmail = action.payload;
      state.userList = state.userList.filter((user) => user.userEmail !== userEmail);
    },
  },
});

export const { addOneOfProduct, removeOneOfProduct, setAmountOfProduct, setPriceOfProduct, setDiscountsOfProduct, clearCart } = fastOrderCartSlice.actions;

export default fastOrderCartSlice.reducer;
