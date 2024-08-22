import { createSlice } from '@reduxjs/toolkit';
import { calculateDiscountedUnitPrice } from '../../utils/calculateDiscounts';

const initialState = {
  userList: [],
};

export const fastOrderCartSlice = createSlice({
  name: 'fastOrderCart',
  initialState,
  reducers: {
    addOneOfProduct: (state, action) => {
      const { userEmail, ratioInPercent, stockName, stockCode, stockPrice, unitPrice, unitType, actualStock, discounts } = action.payload;
      let user = state.userList.find((user) => user.userEmail === userEmail);

      if (!user) {
        user = { userEmail, productsList: [] };
        state.userList.push(user);
      }

      const product = user.productsList.find((product) => product.stockCode === stockCode);

      if (product) {
        product.quantity += 1;
      } else {
        user.productsList.push({ stockName, stockCode, stockPrice, unitPrice, discountedPrice: calculateDiscountedUnitPrice(unitPrice, discounts, ratioInPercent), unitType, actualStock, discounts, quantity: 1 });
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
      const { userEmail, ratioInPercent, stockName, stockCode, quantity, stockPrice, unitPrice, unitType, actualStock, discounts } = action.payload;
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
        user.productsList.push({ stockName, stockCode, stockPrice, unitPrice, discountedPrice: calculateDiscountedUnitPrice(unitPrice, discounts, ratioInPercent), unitType, actualStock, discounts, quantity });
      }
    },
    setPriceOfProduct: (state, action) => {
      const { userEmail, ratioInPercent, stockCode, unitPrice } = action.payload;
      const user = state.userList.find((user) => user.userEmail === userEmail);

      if (user) {
        const product = user.productsList.find((product) => product.stockCode === stockCode);

        if (product) {
          product.unitPrice = unitPrice; // Update unitPrice
          product.discountedPrice = calculateDiscountedUnitPrice(unitPrice, product.discounts, ratioInPercent); // Update discountedPrice
        }
      }
    },
    setDiscountOfProduct: (state, action) => {
      const { userEmail, ratioInPercent, stockCode, discount } = action.payload;
      const user = state.userList.find((user) => user.userEmail === userEmail);

      if (user) {
        const product = user.productsList.find((product) => product.stockCode === stockCode);

        if (product) {
          product.discounts[discount.discountIndex] = discount.discountValue;
          product.discountedPrice = calculateDiscountedUnitPrice(product.unitPrice, product.discounts, ratioInPercent);
        }
      }
    },
    clearCart: (state, action) => {
      const userEmail = action.payload;
      state.userList = state.userList.filter((user) => user.userEmail !== userEmail);
    },
  },
});

export const { addOneOfProduct, removeOneOfProduct, setAmountOfProduct, setPriceOfProduct, setDiscountOfProduct, clearCart } = fastOrderCartSlice.actions;

export default fastOrderCartSlice.reducer;
