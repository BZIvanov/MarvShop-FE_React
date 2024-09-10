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
      getProduct: build.query({
        query: (id) => ({
          url: `/products/${id}`,
          method: 'GET',
        }),
        providesTags: (_result, _error, payload) => {
          return [{ type: 'Products', id: payload }];
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
      updateProduct: build.mutation({
        query: (data) => {
          const { id, formData } = data;

          return {
            url: `/products/${id}`,
            method: 'PATCH',
            body: formData,
            credentials: 'include',
          };
        },
        invalidatesTags: (_result, _error, payload) => {
          return [{ type: 'Products', id: payload.id }];
        },
      }),
      getProductsPriceRange: build.query({
        query: () => ({
          url: '/products/price-range',
          method: 'GET',
        }),
      }),
    };
  },
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useGetProductsPriceRangeQuery,
} = productsApi;
