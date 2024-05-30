import { isRejectedWithValue } from '@reduxjs/toolkit';

import { showNotification } from '../features/notification/notificationSlice';

export const asyncErrorNotification =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (isRejectedWithValue(action)) {
      dispatch(
        showNotification({ type: 'error', message: action.payload.data.error })
      );
    }

    return next(action);
  };
