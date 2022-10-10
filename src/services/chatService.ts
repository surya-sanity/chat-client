import { ChatMessage } from "../models/wsMessage";
import { allApis } from "./allApi";

export const chatApi = allApis.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getChatsByUserId: builder.query<ChatMessage[], string>({
      query: (id) => {
        return {
          url: `api/users/chats/${id}`,
          method: 'GET',
        }
      },
      providesTags: ['Chats'],
    }),
  })
});

export const { useGetChatsByUserIdQuery } = chatApi;