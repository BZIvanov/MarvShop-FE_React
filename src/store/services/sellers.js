import { api } from './api';

export const sellersApi = api.injectEndpoints({
  endpoints: (build) => {
    return {
      getCurrentSeller: build.query({
        query: () => {
          return {
            url: '/sellers/current-seller',
            method: 'GET',
            credentials: 'include',
          };
        },
      }),
    };
  },
});

export const { useGetCurrentSellerQuery } = sellersApi;
