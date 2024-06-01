import { api } from './api';

export const usersApi = api.injectEndpoints({
  endpoints: (build) => {
    return {
      register: build.mutation({
        query: (data) => {
          return {
            url: '/users/register',
            method: 'POST',
            body: data,
            credentials: 'include', // this is needed for the cookies to be set and sent to the backend
          };
        },
      }),
      login: build.mutation({
        query: (data) => {
          return {
            url: '/users/login',
            method: 'POST',
            body: data,
            credentials: 'include',
          };
        },
      }),
      getCurrentUser: build.query({
        query: () => {
          return {
            url: '/users/current-user',
            method: 'GET',
            credentials: 'include',
          };
        },
      }),
    };
  },
});

export const { useRegisterMutation, useLoginMutation, useGetCurrentUserQuery } =
  usersApi;
