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
        providesTags: () => {
          return [{ type: 'Seller' }];
        },
      }),
      updateShopInfo: build.mutation({
        query: (data) => {
          return {
            url: '/sellers/update-shop-info',
            method: 'PATCH',
            body: data,
            credentials: 'include',
          };
        },
        invalidatesTags: () => {
          return [{ type: 'Seller' }];
        },
      }),
    };
  },
});

export const { useGetCurrentSellerQuery, useUpdateShopInfoMutation } =
  sellersApi;
