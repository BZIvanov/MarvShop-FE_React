import { createSlice } from '@reduxjs/toolkit';

import { usersApi } from '../../services/users';

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        usersApi.endpoints.register.matchFulfilled,
        (state, action) => {
          state.user = action.payload.user;
        }
      )
      .addMatcher(usersApi.endpoints.login.matchFulfilled, (state, action) => {
        console.log(action);
        state.user = action.payload.user;
      });
  },
});

export default userSlice.reducer;

export const selectUser = (state) => state.user.user;
