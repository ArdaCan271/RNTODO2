import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  productList: [],
};

export const fastOrderCartSlice = createSlice({
  name: 'fastOrderCart',
  initialState,
  reducers: {
    addOneOfProduct: (state, action) => {
      const product = state.productList.find((product) => product.stockCode === action.payload.stockCode);
      if (product) {
        product.quantity += 1;
      } else {
        state.productList.push({ ...action.payload, quantity: 1 });
      }
    },
    removeOneOfProduct: (state, action) => {
      const product = state.productList.find((product) => product.stockCode === action.payload.stockCode);
      if (product) {
        product.quantity -= 1;
        if (product.quantity === 0) {
          // filter the list so that only the products with the codes that are different from the one being deleted are left on the list
          state.productList = state.productList.filter((product) => product.stockCode !== action.payload.stockCode);
        }
      }
    },
    setAmountOfProduct: (state, action) => {
      const product = state.productList.find((product) => product.stockCode === action.payload.stockCode);
      if (product) {
        product.quantity = action.payload.quantity;
        if (product.quantity === 0) {
          state.productList = state.productList.filter((product) => product.stockCode !== action.payload.stockCode);
        }
      } else {
        // CHECK HERE BEFORE IMPLEMENTING SET AMOUNT OF PRODUCT ON THE PRODUCTCARD!!!!!!!!
        state.productList.push({ ...action.payload });
      }
    },
  },
});

export const { addOneOfProduct, removeOneOfProduct, setAmountOfProduct } = fastOrderCartSlice.actions;

export default fastOrderCartSlice.reducer;