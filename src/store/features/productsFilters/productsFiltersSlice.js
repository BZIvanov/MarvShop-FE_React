import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  text: '',
  price: [0, 0],
  categories: [],
};

const productsFiltersSlice = createSlice({
  name: 'productsFilters',
  initialState,
  reducers: {
    changeFilter: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { changeFilter } = productsFiltersSlice.actions;

export default productsFiltersSlice.reducer;

export const selectFilters = (state) => state.productsFilters;
export const selectTextFilter = (state) => state.productsFilters.text;
export const selectPriceFilter = (state) => state.productsFilters.price;
export const selectCategoriesFilter = (state) =>
  state.productsFilters.categories;
