import { api } from './api';

export const shopsApi = api.injectEndpoints({
  endpoints: (build) => {
    return {
      getShops: build.query({
        query: (params = {}) => {
          return {
            url: '/shops',
            method: 'GET',
            credentials: 'include',
            params,
          };
        },
      }),
      // get shop by id for admins
      getShop: build.query({
        query: (id) => {
          return {
            url: `/shops/${id}`,
            method: 'GET',
            credentials: 'include',
          };
        },
        providesTags: (_result, _error, payload) => {
          return [{ type: 'Shops', id: payload }];
        },
      }),
      // get shop for the currently logged in seller
      getSellerShop: build.query({
        query: () => {
          return {
            url: '/shops/seller',
            method: 'GET',
            credentials: 'include',
          };
        },
      }),
    };
  },
});

export const { useGetShopsQuery, useGetShopQuery, useGetSellerShopQuery } =
  shopsApi;
