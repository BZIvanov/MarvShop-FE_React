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
    };
  },
});

export const { useGetShopsQuery } = shopsApi;
