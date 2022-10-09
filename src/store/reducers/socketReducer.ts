import { createSlice } from "@reduxjs/toolkit";
import { loginApi } from "../../services/loginService";
import { signUpApi } from "../../services/signupService";
import { RootState } from "../../store";

interface SocketReducerInitialType {
  socketConnected: boolean
}

const initialStateValue: SocketReducerInitialType = {
  socketConnected: false
}

export const socketSlice = createSlice({
  name: "socket",
  initialState: initialStateValue,
  reducers: {
    setSocketConnected: (state, action) => {
      if (action.payload !== undefined && action.payload !== null)
        state.socketConnected = action.payload
    },
    resetSocketState: () => initialStateValue,
  },
});

export const getSocketConnected = (state: RootState): boolean => state.socket.socketConnected

export const { setSocketConnected, resetSocketState } = socketSlice.actions;
export default socketSlice.reducer;
