import { api } from './api';

export const categoriesApi = api.injectEndpoints({
  endpoints: (build) => {
    return {
      getCategories: build.query({
        query: () => {
          return {
            url: '/categories',
            method: 'GET',
          };
        },
        providesTags: (result) => {
          return [
            ...result.categories.map(({ _id }) => ({
              type: 'Categories',
              id: _id,
            })),
            { type: 'Categories', id: 'LIST' },
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
          return [{ type: 'Categories', id: 'LIST' }];
        },
      }),
    };
  },
});

export const { useGetCategoriesQuery, useCreateCategoryMutation } =
  categoriesApi;
