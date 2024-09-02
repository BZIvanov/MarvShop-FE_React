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
    };
  },
});

export const { useGetCategoriesQuery, useCreateCategoryMutation } =
  categoriesApi;
