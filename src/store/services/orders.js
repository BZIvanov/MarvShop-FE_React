import { api } from './api';

export const ordersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getOrders: build.query({
      query: (params = {}) => {
        return {
          url: '/orders',
          method: 'GET',
          params,
          credentials: 'include',
        };
      },
      providesTags: (result) => {
        return [
          ...result.orders.map(({ _id }) => ({ type: 'Orders', id: _id })),
          { type: 'Orders', id: 'PARTIAL-LIST' },
        ];
      },
    }),
    createOrder: build.mutation({
      query: (data) => ({
        url: '/orders',
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
      invalidatesTags: () => {
        return [{ type: 'Orders', id: 'LIST' }];
      },
    }),
    getOrdersStats: build.query({
      query: (params = {}) => {
        return {
          url: '/orders/stats',
          method: 'GET',
          params,
          credentials: 'include',
        };
      },
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useCreateOrderMutation,
  useGetOrdersStatsQuery,
} = ordersApi;
