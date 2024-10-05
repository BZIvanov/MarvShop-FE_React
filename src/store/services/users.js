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
      logout: build.mutation({
        query: () => {
          return {
            url: '/users/logout',
            method: 'POST',
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
        providesTags: () => {
          return [{ type: 'User' }];
        },
      }),
      forgotPassword: build.mutation({
        query: (data) => {
          return {
            url: '/users/forgot-password',
            method: 'POST',
            body: data,
          };
        },
      }),
      updateAvatar: build.mutation({
        query: (data) => {
          return {
            url: '/users/update-avatar',
            method: 'PATCH',
            body: data,
            credentials: 'include',
          };
        },
        invalidatesTags: () => {
          return [{ type: 'User' }];
        },
      }),
      getSellers: build.query({
        query: (params = {}) => {
          return {
            url: '/users/sellers',
            method: 'GET',
            credentials: 'include',
            params,
          };
        },
      }),
      getSeller: build.query({
        query: (id) => ({
          url: `/users/sellers/${id}`,
          method: 'GET',
          credentials: 'include',
        }),
      }),
    };
  },
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetCurrentUserQuery,
  useForgotPasswordMutation,
  useUpdateAvatarMutation,
  useGetSellersQuery,
  useGetSellerQuery,
} = usersApi;
