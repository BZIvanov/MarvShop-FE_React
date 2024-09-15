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
    getOrder: build.query({
      query: (id) => {
        return {
          url: `/orders/${id}`,
          method: 'GET',
          credentials: 'include',
        };
      },
      providesTags: (_result, _error, payload) => {
        return [{ type: 'Orders', id: payload }];
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
  useGetOrderQuery,
  useCreateOrderMutation,
  useGetOrdersStatsQuery,
} = ordersApi;
