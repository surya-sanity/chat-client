import { UpdateSeenMessageType } from './../../models/wsMessage';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatMessage } from "../../models/wsMessage";
import { RootState } from "../../store";
import { chatApi } from '../../services/chatService';

interface ChatReducerInitialType {
  chats: ChatMessage[]
  typing: {
    fromUserId: string | undefined,
    typing: boolean
  }
}

const initialStateValue: ChatReducerInitialType = {
  chats: [],
  typing: {
    fromUserId: undefined,
    typing: false
  }
}

export const chatSlice = createSlice({
  name: "chat",
  initialState: initialStateValue,
  reducers: {
    addChats: (state, action: PayloadAction<ChatMessage>) => {
      if (action.payload !== undefined && action.payload !== null) {
        const alreadyExists = state.chats.find((chat) => chat.messageId === action.payload.messageId)

        if (!alreadyExists) {
          state.chats.push(action.payload);
        }
      }
    },
    updateChat: (state, action: PayloadAction<UpdateSeenMessageType>) => {
      const messageId = action.payload?.messageId

      const messageFound = state.chats.find((chat) => chat.messageId === messageId);

      if (messageFound) {
        messageFound.dateSeen = action.payload?.dateSeen;
        messageFound.seen = action.payload?.seen;
      }

    },
    setTyping: (state, action) => {
      state.typing.fromUserId = action.payload.fromUserId
      state.typing.typing = action.payload.typing
    },
    resetChats: () => initialStateValue,
  },
  extraReducers: (builder) => {
    builder.addMatcher(chatApi.endpoints.getChatsByUserId.matchFulfilled, (state, action) => {
      if (action.payload) {
        action.payload.forEach((item) => {
          const alreadyExist = state.chats.find((chat) => chat.messageId === item.messageId)

          if (!alreadyExist) {
            state.chats.push(item)
          }
        })
      }
    });
  }
});

export const getChats = (state: RootState): ChatMessage[] => state.chat.chats
export const getTyping = (state: RootState): { fromUserId: string, typing: boolean } => state.chat.typing

export const { addChats, resetChats, setTyping, updateChat } = chatSlice.actions;
export default chatSlice.reducer;
