import { createSlice } from "@reduxjs/toolkit";
import { ChatMessage } from "../../models/wsMessage";
import { RootState } from "../../store";

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
    addChats: (state, action) => {
      if (action.payload !== undefined && action.payload !== null)
        state.chats.push(action.payload);
    },
    setTyping: (state, action) => {
      state.typing.fromUserId = action.payload.fromUserId
      state.typing.typing = action.payload.typing
    },
    resetChats: () => initialStateValue,
  },
});

export const getChats = (state: RootState): ChatMessage[] => state.chat.chats
export const getTyping = (state: RootState): { fromUserId: string, typing: boolean } => state.chat.typing

export const { addChats, resetChats, setTyping } = chatSlice.actions;
export default chatSlice.reducer;
