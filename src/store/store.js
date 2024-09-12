import { configureStore } from '@reduxjs/toolkit';
import {
  useDispatch as useAppDispatch,
  useSelector as useTypedSelector,
} from 'react-redux';

import { api } from './services/api';
import user from './features/user/userSlice';
import seller from './features/seller/sellerSlice';
import notification from './features/notification/notificationSlice';
import productsFilters from './features/productsFilters/productsFiltersSlice';
import cart from './features/cart/cartSlice';
import { asyncErrorNotification } from './middlewares/asyncErrorNotification';

export const createStore = (options = {}) => {
  return configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      user,
      seller,
      notification,
      productsFilters,
      cart,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware, asyncErrorNotification),
    devTools: import.meta.env.MODE === 'development',
    ...options,
  });
};

export const useDispatch = useAppDispatch;
export const useSelector = useTypedSelector;
