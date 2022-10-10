import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface OnlineUser {
  userId: string,
  isOnline: boolean
}


interface OnlineUsersInitialType {
  onlineUsers: OnlineUser[]
}

const initialStateValue: OnlineUsersInitialType = {
  onlineUsers: []
}

export const onlineUserSlice = createSlice({
  name: "onlineUser",
  initialState: initialStateValue,
  reducers: {
    updateOnlineUser: (state, action: PayloadAction<OnlineUser>) => {
      if (action.payload !== undefined && action.payload !== null) {
        const userFound = state.onlineUsers.find((user) => user.userId === action.payload.userId)

        if (userFound) {
          userFound.isOnline = action.payload.isOnline
        }
        else {
          state.onlineUsers.push(action.payload)
        }
      }
    },
    resetOnlineUserState: () => initialStateValue,
  },
});

export const getOnlineUsers = (state: RootState): OnlineUser[] => state.onlineUser.onlineUsers

export const { updateOnlineUser, resetOnlineUserState } = onlineUserSlice.actions;
export default onlineUserSlice.reducer;
