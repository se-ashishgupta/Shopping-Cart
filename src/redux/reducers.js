import { createReducer } from "@reduxjs/toolkit";

export const cartReducer = createReducer(
  {
    cartItems: [],
    subTotal: 0,
    shipping: 0,
    tax: 0,
    total: 0,
  },
  {
    addToCart: (state, action) => {
      const item = action.payload;
      const isItemExist = state.cartItems.find((i) => i.id === item.id);
      if (isItemExist) {
        isItemExist.quantity += 1;
      } else {
        state.cartItems.push(item);
      }
    },

    decrement: (state, action) => {
      const item = action.payload;
      const isItemExist = state.cartItems.find((i) => i.id === item.id);
      if (isItemExist.quantity === 1) {
        state.cartItems = state.cartItems.filter((i) => i.id !== item.id);
      } else {
        isItemExist.quantity -= 1;
      }
    },

    deleteItem: (state, action) => {
      const item = action.payload;
      state.cartItems = state.cartItems.filter((i) => i.id !== item.id);
    },

    calculateTotal: (state, action) => {
      const { cartItems } = state;
      let subTotal = 0;
      cartItems.forEach((i) => {
        subTotal += +(i.price * i.quantity).toFixed();
      });
      state.subTotal = subTotal;
      state.shipping = subTotal > 1000 ? 0 : 200;
      state.tax = +(subTotal * 0.05).toFixed();
      state.total = subTotal + state.shipping + state.tax;
    },
  }
);
