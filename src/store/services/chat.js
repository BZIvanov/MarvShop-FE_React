import { api } from './api';

export const chatApi = api.injectEndpoints({
  endpoints: (build) => ({
    getChats: build.query({
      query: (params) => {
        return {
          url: '/chats',
          method: 'GET',
          params,
          credentials: 'include',
        };
      },
    }),
    getChat: build.query({
      query: (data) => {
        const { receiverId, ...rest } = data;

        return {
          url: `/chats/${receiverId}`,
          method: 'GET',
          params: rest,
          credentials: 'include',
        };
      },
    }),
  }),
});

export const { useGetChatsQuery, useGetChatQuery } = chatApi;
