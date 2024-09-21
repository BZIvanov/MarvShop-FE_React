import { api } from './api';

export const chatApi = api.injectEndpoints({
  endpoints: (build) => ({
    getChat: build.query({
      query: (data) => {
        const { receiverId, ...rest } = data;

        return {
          url: `/chat/${receiverId}`,
          method: 'GET',
          params: rest,
          credentials: 'include',
        };
      },
    }),
  }),
});

export const { useGetChatQuery } = chatApi;
