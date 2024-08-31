import { createSlice } from '@reduxjs/toolkit';

import { sellersApi } from '../../services/sellers';

const initialState = {
  seller: null,
  initialLoadingCompleted: false,
};

export const sellerSlice = createSlice({
  name: 'seller',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      sellersApi.endpoints.getCurrentSeller.matchFulfilled,
      (state, action) => {
        state.seller = action.payload.seller;
        state.initialLoadingCompleted = true;
      }
    );
  },
});

export default sellerSlice.reducer;

export const selectSeller = (state) => state.seller.seller;
export const selectSellerInitialLoadingCompleted = (state) =>
  state.seller.initialLoadingCompleted;
