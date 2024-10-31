import { api } from './api';

// TODO: completely remove this service and use shop service
export const sellersApi = api.injectEndpoints({
  endpoints: (build) => {
    return {
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

export const { useUpdateShopInfoMutation } = sellersApi;
