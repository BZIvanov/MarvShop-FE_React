import { configureStore } from '@reduxjs/toolkit';
import {
  useDispatch as useAppDispatch,
  useSelector as useTypedSelector,
} from 'react-redux';

import user from './features/user/userSlice';

export const createStore = (options = {}) => {
  return configureStore({
    reducer: {
      user,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: import.meta.env.MODE === 'development',
    ...options,
  });
};

export const useDispatch = useAppDispatch;
export const useSelector = useTypedSelector;
