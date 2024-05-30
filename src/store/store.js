import { configureStore } from '@reduxjs/toolkit';
import {
  useDispatch as useAppDispatch,
  useSelector as useTypedSelector,
} from 'react-redux';

import { api } from './services/api';
import user from './features/user/userSlice';
import notification from './features/notification/notificationSlice';
import { asyncErrorNotification } from './middlewares/asyncErrorNotification';

export const createStore = (options = {}) => {
  return configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      user,
      notification,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware, asyncErrorNotification),
    devTools: import.meta.env.MODE === 'development',
    ...options,
  });
};

export const useDispatch = useAppDispatch;
export const useSelector = useTypedSelector;
