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
            credentials: 'include',
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
    };
  },
});

export const { useRegisterMutation, useLoginMutation } = usersApi;
