import { api } from './api';

export const productsApi = api.injectEndpoints({
  endpoints: (build) => {
    return {
      getProducts: build.query({
        query: (params = {}) => {
          return {
            url: '/products',
            method: 'GET',
            params,
          };
        },
        providesTags: (result) => {
          return [
            ...result.products.map(({ _id }) => ({
              type: 'Products',
              id: _id,
            })),
            { type: 'Products', id: 'PARTIAL-LIST' },
          ];
        },
      }),
      createProduct: build.mutation({
        query: (data) => {
          return {
            url: '/products',
            method: 'POST',
            body: data,
            credentials: 'include',
          };
        },
        invalidatesTags: () => {
          return [{ type: 'Products', id: 'PARTIAL-LIST' }];
        },
      }),
    };
  },
});

export const { useGetProductsQuery, useCreateProductMutation } = productsApi;
