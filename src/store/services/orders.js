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
    getSellerOrders: build.query({
      query: (params = {}) => {
        return {
          url: '/orders/seller',
          method: 'GET',
          params,
          credentials: 'include',
        };
      },
      providesTags: (result) => {
        return [
          ...result.orders.map(({ _id }) => ({
            type: 'SellerOrders',
            id: _id,
          })),
          { type: 'SellerOrders', id: 'PARTIAL-LIST' },
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
      providesTags: () => {
        return [{ type: 'Order' }];
      },
    }),
    getSellerOrder: build.query({
      query: (id) => {
        return {
          url: `/orders/seller/${id}`,
          method: 'GET',
          credentials: 'include',
        };
      },
      providesTags: () => {
        return [{ type: 'SellerOrder' }];
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
    updateOrderStatus: build.mutation({
      query: (data) => {
        const { id, ...body } = data;

        return {
          url: `/orders/${id}`,
          method: 'PATCH',
          body,
          credentials: 'include',
        };
      },
      invalidatesTags: (_result, _error, payload) => {
        return [{ type: 'Orders', id: payload.id }, { type: 'Order' }];
      },
    }),
    updateSellerOrderStatus: build.mutation({
      query: (data) => {
        const { id, ...body } = data;

        return {
          url: `/orders/seller/${id}`,
          method: 'PATCH',
          body,
          credentials: 'include',
        };
      },
      invalidatesTags: (_result, _error, payload) => {
        return [
          { type: 'SellerOrders', id: payload.id },
          { type: 'SellerOrder' },
        ];
      },
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetSellerOrdersQuery,
  useGetOrderQuery,
  useGetSellerOrderQuery,
  useCreateOrderMutation,
  useGetOrdersStatsQuery,
  useUpdateOrderStatusMutation,
  useUpdateSellerOrderStatusMutation,
} = ordersApi;
