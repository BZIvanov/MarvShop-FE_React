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
        query: (slug) => ({
          url: `/products/${slug}`,
          method: 'GET',
        }),
        providesTags: (_result, _error, payload) => {
          // the payload will be the slug, which must be used in case we want to invalidate the cache results
          return [{ type: 'Product', id: payload }];
        },
      }),
      getSimilarProducts: build.query({
        query: (params) => {
          const { id, ...rest } = params;

          return {
            url: `/products/${id}/similar`,
            method: 'GET',
            params: rest,
          };
        },
        providesTags: (result) => {
          return [
            ...result.products.map(({ _id }) => ({
              type: 'SimilarProducts',
              id: _id,
            })),
            { type: 'SimilarProducts', id: 'LIST' },
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
  useGetSimilarProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useGetProductsPriceRangeQuery,
} = productsApi;
