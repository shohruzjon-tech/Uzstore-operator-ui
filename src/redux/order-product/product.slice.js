import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
};

export const orderProducts = createSlice({
  name: "order/manageProductList",
  initialState,
  reducers: {
    setProductList: (state, { payload }) => {
      state.list = payload?.map((doc) => {
        return {
          ...doc?.productId,
          quantity: doc.quantity,
        };
      });
    },
    addProduct: (state, { payload }) => {
      const check = state.list.find((item) => item._id === payload._id);
      const filtered = state.list.filter((item) => item._id !== payload._id);

      if (check) {
        state.list = [...filtered, { ...check, quantity: check.quantity + 1 }];
      } else if (!check) {
        state.list.push({ ...payload, quantity: 1 });
      }
    },
    deleteProduct: (state, { payload }) => {
      const check = state.list.find((item) => item._id === payload._id);
      const filtered = state.list.filter((item) => item._id !== payload._id);

      if (check && check.quantity === 1) {
        state.list = filtered;
      } else if (check && check.quantity > 1) {
        state.list = [...filtered, { ...check, quantity: check.quantity - 1 }];
      } else {
        return;
      }
    },
  },
});

export const { setProductList, addProduct, deleteProduct } =
  orderProducts.actions;

export default orderProducts.reducer;
