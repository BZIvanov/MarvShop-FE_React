import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: {},
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, count } = action.payload;
      state.cart[product._id] = { product, count };
    },
    removeFromCart: (state, action) => {
      const cartProducts = Object.assign(state.cart, {});
      delete cartProducts[action.payload];
      state.cart = cartProducts;
    },
    clearCart: () => initialState,
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;

export const selectCart = (state) => state.cart.cart;
export const selectCartProductById = (productId) => (state) =>
  state.cart.cart[productId];
