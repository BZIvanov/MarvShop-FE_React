import { api } from './api';

export const categoriesApi = api.injectEndpoints({
  endpoints: (build) => {
    return {
      getCategories: build.query({
        query: (params = {}) => {
          return {
            url: '/categories',
            method: 'GET',
            params,
          };
        },
        providesTags: (result) => {
          return [
            ...result.categories.map(({ _id }) => ({
              type: 'Categories',
              id: _id,
            })),
            { type: 'Categories', id: 'PARTIAL-LIST' },
          ];
        },
      }),
      getCategory: build.query({
        query: (id) => {
          return {
            url: `/categories/${id}`,
            method: 'GET',
          };
        },
        providesTags: (_result, _error, payload) => {
          return [{ type: 'Category', id: payload }];
        },
      }),
      createCategory: build.mutation({
        query: (data) => {
          return {
            url: '/categories',
            method: 'POST',
            body: data,
            credentials: 'include',
          };
        },
        invalidatesTags: () => {
          return [{ type: 'Categories', id: 'PARTIAL-LIST' }];
        },
      }),
      updateCategory: build.mutation({
        query: (data) => {
          const { id, formData } = data;

          return {
            url: `/categories/${id}`,
            method: 'PATCH',
            body: formData,
            credentials: 'include',
          };
        },
        invalidatesTags: (_result, _error, payload) => {
          return [{ type: 'Categories', id: payload.id }];
        },
      }),
      deleteCategory: build.mutation({
        query: (id) => {
          return {
            url: `/categories/${id}`,
            method: 'DELETE',
            credentials: 'include',
          };
        },
        invalidatesTags: (_result, _error, payload) => {
          return [{ type: 'Categories', id: payload }];
        },
      }),
    };
  },
});

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;
